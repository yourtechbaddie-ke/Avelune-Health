import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

APP_VERSION = "0.1.0"
origins = [origin.strip() for origin in os.getenv("AVELUNE_ALLOWED_ORIGINS", "http://localhost:5173").split(",") if origin.strip()]

app = FastAPI(
    title="Avelune Health API",
    description="Non-clinical care-navigation API foundation. Not for diagnosis or emergency use.",
    version=APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["Content-Type"],
)

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
    Pathway(id="appointment", title="Prepare for an appointment", description="Organise questions and practical details for a conversation with a qualified care professional.", checklist=[
        "Write down the questions that matter most",
        "Bring a current list of medicines and supplements",
        "Gather relevant reports or appointment notes",
        "Ask who to contact with concerns after the visit",
        "Plan transport or someone to accompany you",
    ]),
    Pathway(id="understanding", title="Understand information received", description="Clarify information with a qualified healthcare professional; do not use this checklist to choose treatment.", checklist=[
        "Ask for unfamiliar terms to be explained in plain language",
        "Ask what is known and what remains uncertain",
        "Ask which options are appropriate to discuss",
        "Ask about benefits, risks and possible side effects",
        "Ask where to get a written summary or trusted information",
    ]),
    Pathway(id="caregiver", title="Coordinate caregiver support", description="Plan practical support while respecting the person's choices and privacy.", checklist=[
        "Ask what kind of help the person wants",
        "Agree what information may be shared and with whom",
        "Coordinate practical help such as meals or transport",
        "Identify a trusted contact for agreed updates",
        "Make time for caregiver rest and support",
    ]),
    Pathway(id="wellbeing", title="Find everyday wellbeing support", description="Explore supportive services alongside professional cancer care.", checklist=[
        "Ask about counselling or psycho-oncology support",
        "Ask whether a social worker or patient navigator is available",
        "Discuss suitable rehabilitation referrals with the care team",
        "Identify a trusted person to talk to",
        "Ask about community and practical support services",
    ]),
]

@app.get("/health", response_model=HealthResponse, tags=["Platform"])
async def health():
    return HealthResponse(status="ok", service="avelune-health-api", version=APP_VERSION, data_mode="no-patient-data")

@app.get("/v1/care-pathways", response_model=list[Pathway], tags=["Care navigation"])
async def care_pathways():
    return PATHWAYS

@app.get("/v1/safety", response_model=SafetyResponse, tags=["Safety"])
async def safety():
    return SafetyResponse(
        product_scope="Avelune Health supports care navigation and appointment preparation; it does not diagnose cancer or recommend treatment.",
        urgent_care="For severe, sudden or rapidly worsening symptoms, seek urgent medical care or contact local emergency services.",
        ai_boundary="Belle is an AI companion, not a clinician. AI output must not replace professional assessment.",
        data_notice="This API foundation does not accept or store patient health information. Use synthetic data only in the prototype.",
    )

@app.exception_handler(Exception)
async def safe_unexpected_error(request, exc):
    return JSONResponse(status_code=500, content={"detail": "An unexpected server error occurred."})


class PaymentMethodCapability(BaseModel):
    id: str
    name: str
    status: str
    availability: str
    notes: str

class PaymentCapabilitiesResponse(BaseModel):
    enabled_for_live_payments: bool
    currency_standard: str
    currency_conversion: str
    methods: list[PaymentMethodCapability]
    safety_notice: str

PAYMENT_CAPABILITIES = PaymentCapabilitiesResponse(
    enabled_for_live_payments=False,
    currency_standard="ISO 4217 three-letter currency codes",
    currency_conversion="Not connected. The checkout must show the provider-confirmed amount and currency; no exchange rate is estimated by this API.",
    methods=[
        PaymentMethodCapability(
            id="paypal",
            name="PayPal",
            status="planned",
            availability="Subject to PayPal merchant-country, account and currency support",
            notes="Server-created orders, server-side capture and verified webhooks. Never expose the PayPal secret in the browser.",
        ),
        PaymentMethodCapability(
            id="mpesa",
            name="M-Pesa",
            status="planned",
            availability="Initially Kenya; other mobile-money markets require a locally supported provider",
            notes="Use an authorised Daraja/payment-aggregator integration, server-side STK push and signed/validated callbacks. Do not treat a client screenshot as proof of payment.",
        ),
        PaymentMethodCapability(
            id="bank_transfer",
            name="Bank transfer",
            status="planned",
            availability="Country and bank dependent",
            notes="Use provider-issued beneficiary and reference details, reconcile against bank/provider confirmation, and never mark a transfer paid from patient-submitted evidence alone.",
        ),
    ],
    safety_notice="This prototype does not create charges, collect payment credentials, store bank details or accept health information. Payments must be for an itemised service from a verified provider, with a clear refund and dispute route.",
)

@app.get("/v1/payment-capabilities", response_model=PaymentCapabilitiesResponse, tags=["Payments"])
async def payment_capabilities():
    """Describe planned payment rails without accepting or initiating payments."""
    return PAYMENT_CAPABILITIES
