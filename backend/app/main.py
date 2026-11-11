import os
from pathlib import Path
import re
import secrets
from decimal import Decimal, InvalidOperation
from typing import Literal

import httpx
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator
from .auth import CognitoSettings, require_current_principal

APP_VERSION = "0.2.0"
origins = [origin.strip() for origin in os.getenv("AVELUNE_ALLOWED_ORIGINS", "http://localhost:5173").split(",") if origin.strip()]
app = FastAPI(title="Avelune Health API", description="AI care navigation and PayPal sandbox API. Not for diagnosis or emergency use.", version=APP_VERSION)
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=False, allow_methods=["GET", "POST", "OPTIONS"], allow_headers=["Content-Type", "Authorization"])

@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Cache-Control"] = "no-store"
    return response

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    data_mode: str

class Pathway(BaseModel):
    id: str
    title: str
    description: str
    checklist: list[str]

class SafetyResponse(BaseModel):
    product_scope: str
    urgent_care: str
    ai_boundary: str
    data_notice: str

PATHWAYS = [
    Pathway(id="appointment", title="Prepare for an appointment", description="Organise questions and practical details for a conversation with a qualified care professional.", checklist=["Write down the questions that matter most", "Bring a current list of medicines and supplements", "Gather relevant reports or appointment notes", "Ask who to contact with concerns after the visit", "Plan transport or someone to accompany you"]),
    Pathway(id="understanding", title="Understand information received", description="Clarify information with a qualified healthcare professional; do not use this checklist to choose treatment.", checklist=["Ask for unfamiliar terms to be explained in plain language", "Ask what is known and what remains uncertain", "Ask which options are appropriate to discuss", "Ask about benefits, risks and possible side effects", "Ask where to get a written summary or trusted information"]),
    Pathway(id="caregiver", title="Coordinate caregiver support", description="Plan practical support while respecting the person's choices and privacy.", checklist=["Ask what kind of help the person wants", "Agree what information may be shared and with whom", "Coordinate practical help such as meals or transport", "Identify a trusted contact for agreed updates", "Make time for caregiver rest and support"]),
    Pathway(id="wellbeing", title="Find everyday wellbeing support", description="Explore supportive services alongside professional cancer care.", checklist=["Ask about counselling or psycho-oncology support", "Ask whether a social worker or patient navigator is available", "Discuss suitable rehabilitation referrals with the care team", "Identify a trusted person to talk to", "Ask about community and practical support services"]),
]

BELLE_SOURCES = [
    {"title": "National Cancer Institute of Kenya", "url": "https://www.ncikenya.go.ke/"},
    {"title": "Kenya National Cancer Treatment Protocols", "url": "https://uploads.ncikenya.go.ke/uploads/policy/National-cancer-treatment-Protocols-2019.pdf"},
    {"title": "National Cancer Institute: Types of Cancer Treatment", "url": "https://www.cancer.gov/about-cancer/treatment/types"},
    {"title": "KMPDC practitioner and facility register", "url": "https://registers.kmpdc.go.ke/"},
]

@app.get("/health", response_model=HealthResponse, tags=["Platform"])
async def health():
    return HealthResponse(status="ok", service="avelune-health-api", version=APP_VERSION, data_mode="no-patient-data")

@app.get("/v1/care-pathways", response_model=list[Pathway], tags=["Care navigation"])
async def care_pathways():
    return PATHWAYS

@app.get("/v1/safety", response_model=SafetyResponse, tags=["Safety"])
async def safety():
    return SafetyResponse(product_scope="Avelune Health supports care navigation and appointment preparation; it does not diagnose cancer or recommend treatment.", urgent_care="For severe, sudden or rapidly worsening symptoms, seek urgent medical care or contact local emergency services.", ai_boundary="Belle is an AI companion, not a clinician. AI output must not replace professional assessment.", data_notice="The prototype does not accept or store patient health information. Use synthetic data only.")

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=1200)

class BelleRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1200)
    history: list[ChatMessage] = Field(default_factory=list, max_length=8)

class BelleResponse(BaseModel):
    reply: str
    sources: list[dict[str, str]]
    mode: str

@app.post("/v1/belle/chat", response_model=BelleResponse, tags=["Belle AI"])
async def belle_chat(payload: BelleRequest):
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        raise HTTPException(status_code=503, detail="Belle AI is not configured yet. Add the server-side OPENAI_API_KEY to enable the live AI companion.")
    system = """You are Belle, Avelune Health's compassionate cancer-care navigation companion. You are NOT a clinician.
Strict safety: never diagnose cancer, estimate cancer probability, interpret scans/pathology, prescribe or recommend a specific medicine, dose, regimen, treatment choice, or individualised care plan. Never infer disease from images, voice, facial expression or emotion. Do not claim to review medical records or have contacted a provider. Do not provide medication or treatment habits as instructions. Explain general concepts only, and encourage discussion with the treating oncology team. Treatment depends on cancer type, stage, biomarkers, prior treatment, health and patient preferences. If symptoms are severe, sudden or rapidly worsening, tell the person to seek urgent medical care now and not wait for chat. If suicidal intent or immediate danger appears, direct to local emergency services and a trusted person. Do not request names, ID numbers, full records, addresses or other identifying data. Do not send patient data to payment services. Keep answers empathetic, plain-language, concise and practical. Help with appointment questions, care navigation and finding official resources. If asked for provider contacts, direct to official facility and regulator directories; never invent a clinician or contact. For paid therapy/video visits, explain that Avelune cannot claim booking availability until a verified provider calendar, credentials, consent and payment capture are connected. Cite only the supplied sources when relevant. State uncertainty clearly."""
    messages = [{"role": "system", "content": system + "\nTrusted public sources: " + str(BELLE_SOURCES)}]
    messages.extend([item.model_dump() for item in payload.history[-8:]])
    if not messages or messages[-1].get("content") != payload.message:
        messages.append({"role": "user", "content": payload.message})
    model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
    async with httpx.AsyncClient(timeout=35) as client:
        try:
            response = await client.post("https://api.openai.com/v1/chat/completions", headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}, json={"model": model, "messages": messages, "temperature": 0.25, "max_tokens": 650})
            response.raise_for_status()
            data = response.json()
            reply = data["choices"][0]["message"]["content"].strip()
        except (httpx.HTTPError, KeyError, IndexError, ValueError):
            raise HTTPException(status_code=502, detail="Belle could not reach the AI service. Please try again.")
    return BelleResponse(reply=reply, sources=BELLE_SOURCES, mode="live-ai")

class PayPalOrderRequest(BaseModel):
    amount: str = Field(min_length=1, max_length=12)
    currency: str = Field(min_length=3, max_length=3)
    description: str = Field(min_length=3, max_length=127)

    @field_validator("currency")
    @classmethod
    def currency_upper(cls, value):
        if not re.fullmatch(r"[A-Za-z]{3}", value):
            raise ValueError("Use a three-letter ISO currency code.")
        return value.upper()

    @field_validator("amount")
    @classmethod
    def valid_amount(cls, value):
        try:
            amount = Decimal(value)
        except InvalidOperation:
            raise ValueError("Amount must be a valid decimal.")
        if not amount.is_finite() or amount <= 0 or amount > Decimal("100"):
            raise ValueError("Sandbox amount must be greater than zero and no more than 100.")
        if amount.as_tuple().exponent < -2:
            raise ValueError("Amount supports at most two decimal places.")
        return format(amount, ".2f")

def paypal_config():
    client_id = os.getenv("PAYPAL_CLIENT_ID", "").strip()
    secret = os.getenv("PAYPAL_CLIENT_SECRET", "").strip()
    if not client_id or not secret:
        raise HTTPException(status_code=503, detail="PayPal Sandbox is not configured. Add server-side sandbox credentials.")
    base = os.getenv("PAYPAL_API_BASE", "https://api-m.sandbox.paypal.com").rstrip("/")
    if "sandbox" not in base:
        raise HTTPException(status_code=503, detail="This demo is restricted to PayPal Sandbox.")
    return client_id, secret, base

async def paypal_access_token(client: httpx.AsyncClient, client_id: str, secret: str, base: str):
    response = await client.post(f"{base}/v1/oauth2/token", auth=(client_id, secret), data={"grant_type": "client_credentials"}, headers={"Accept": "application/json", "Accept-Language": "en_US"})
    if response.is_error:
        raise HTTPException(status_code=502, detail="PayPal Sandbox authentication failed.")
    return response.json()["access_token"]

@app.post("/v1/payments/paypal/orders", tags=["PayPal Sandbox"])
async def create_paypal_order(payload: PayPalOrderRequest):
    client_id, secret, base = paypal_config()
    async with httpx.AsyncClient(timeout=25) as client:
        token = await paypal_access_token(client, client_id, secret, base)
        response = await client.post(f"{base}/v2/checkout/orders", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json", "PayPal-Request-Id": secrets.token_urlsafe(18)}, json={"intent": "CAPTURE", "purchase_units": [{"amount": {"currency_code": payload.currency, "value": payload.amount}, "description": payload.description[:127]}], "application_context": {"brand_name": "Avelune Health (Sandbox)", "user_action": "PAY_NOW", "return_url": os.getenv("PAYPAL_RETURN_URL", "http://localhost:5173/payments?return=paypal"), "cancel_url": os.getenv("PAYPAL_CANCEL_URL", "http://localhost:5173/payments?cancelled=1")}})
        if response.is_error:
            raise HTTPException(status_code=502, detail="PayPal Sandbox could not create the order. Check currency and merchant sandbox configuration.")
        return response.json()

@app.post("/v1/payments/paypal/orders/{order_id}/capture", tags=["PayPal Sandbox"])
async def capture_paypal_order(order_id: str):
    if not re.fullmatch(r"[A-Z0-9-]{8,80}", order_id):
        raise HTTPException(status_code=400, detail="Invalid PayPal order reference.")
    client_id, secret, base = paypal_config()
    async with httpx.AsyncClient(timeout=25) as client:
        token = await paypal_access_token(client, client_id, secret, base)
        response = await client.post(f"{base}/v2/checkout/orders/{order_id}/capture", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json", "PayPal-Request-Id": secrets.token_urlsafe(18)})
        if response.is_error:
            raise HTTPException(status_code=502, detail="PayPal Sandbox capture could not be verified.")
        result = response.json()
    if result.get("status") != "COMPLETED":
        raise HTTPException(status_code=409, detail="PayPal has not confirmed a completed capture.")
    return {"status": "COMPLETED", "order_id": order_id, "capture": result}

@app.post("/v1/payments/paypal/webhook/verify", tags=["PayPal Sandbox"])
async def verify_paypal_webhook(request: Request):
    client_id, secret, base = paypal_config()
    event = await request.json()
    required_headers = ["PAYPAL-AUTH-ALGO", "PAYPAL-CERT-URL", "PAYPAL-TRANSMISSION-ID", "PAYPAL-TRANSMISSION-SIG", "PAYPAL-TRANSMISSION-TIME"]
    headers = {key.lower(): request.headers.get(key) for key in required_headers}
    if any(not value for value in headers.values()):
        raise HTTPException(status_code=400, detail="Required PayPal webhook signature headers are missing.")
    webhook_id = os.getenv("PAYPAL_WEBHOOK_ID", "").strip()
    if not webhook_id:
        raise HTTPException(status_code=503, detail="Configure the PayPal Sandbox webhook ID before webhook verification.")
    async with httpx.AsyncClient(timeout=25) as client:
        token = await paypal_access_token(client, client_id, secret, base)
        response = await client.post(f"{base}/v1/notifications/verify-webhook-signature", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}, json={"auth_algo": headers["paypal-auth-algo"], "cert_url": headers["paypal-cert-url"], "transmission_id": headers["paypal-transmission-id"], "transmission_sig": headers["paypal-transmission-sig"], "transmission_time": headers["paypal-transmission-time"], "webhook_id": webhook_id, "webhook_event": event})
        if response.is_error:
            raise HTTPException(status_code=502, detail="PayPal webhook verification request failed.")
        verification = response.json()
    if verification.get("verification_status") != "SUCCESS":
        raise HTTPException(status_code=400, detail="PayPal webhook signature was not verified.")
    return {"verified": True, "event_type": event.get("event_type"), "event_id": event.get("id")}

@app.get("/v1/payment-capabilities", tags=["Payments"])
async def payment_capabilities():
    return {"enabled_for_live_payments": False, "primary_provider": "PayPal", "environment": "sandbox", "currency_standard": "ISO 4217", "methods": [{"id": "paypal", "name": "PayPal", "status": "sandbox-integration-ready", "notes": "Server-side order creation, capture and webhook signature verification."}], "safety_notice": "Sandbox only. No real patient charges. A successful checkout must be captured and reconciled server-side. No diagnosis or treatment data is sent to PayPal."}

@app.get("/v1/auth/config", tags=["Authentication"])
async def auth_config():
    settings = CognitoSettings.from_env()
    if settings is None:
        return {"configured": False, "provider": "aws-cognito"}
    return {"configured": True, "provider": "aws-cognito", "region": settings.region, "user_pool_id": settings.user_pool_id, "app_client_id": settings.app_client_id, "issuer": settings.issuer}

@app.get("/v1/auth/me", tags=["Authentication"])
async def auth_me(principal: dict = Depends(require_current_principal)):
    return principal

@app.exception_handler(Exception)
async def safe_unexpected_error(request, exc):
    return JSONResponse(status_code=500, content={"detail": "An unexpected server error occurred."})


# Serve the built React application from the same origin as the API.
# Unknown paths fall back to index.html so direct visits and refreshes work
# on every client-side route (for example /workspace or /payments).
class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except HTTPException as exc:
            if exc.status_code == 404:
                return await super().get_response("index.html", scope)
            raise

frontend_dist = Path(__file__).resolve().parents[2] / "dist"
if frontend_dist.is_dir():
    app.mount("/", SPAStaticFiles(directory=str(frontend_dist), html=True), name="frontend")
