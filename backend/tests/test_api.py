from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint_discloses_demo_data_mode():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["data_mode"] == "no-patient-data"

def test_care_pathways_are_non_empty_and_have_checklists():
    response = client.get("/v1/care-pathways")
    assert response.status_code == 200
    pathways = response.json()
    assert len(pathways) == 4
    assert all(item["checklist"] for item in pathways)

def test_safety_endpoint_has_urgent_care_and_ai_boundaries():
    response = client.get("/v1/safety")
    assert response.status_code == 200
    body = response.json()
    assert "urgent" in body["urgent_care"].lower()
    assert "not a clinician" in body["ai_boundary"].lower()

def test_security_headers_are_present():
    response = client.get("/health")
    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["x-frame-options"] == "DENY"
    assert response.headers["cache-control"] == "no-store"

def test_payment_capabilities_are_paypal_centric_and_moving_away_from_mobile_money():
    response = client.get("/v1/payment-capabilities")
    assert response.status_code == 200
    body = response.json()
    assert body["primary_provider"] == "PayPal"
    assert body["enabled_for_live_payments"] is False
    assert [item["id"] for item in body["methods"]] == ["paypal"]

def test_belle_requires_server_side_ai_configuration(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = client.post("/v1/belle/chat", json={"message": "Help me prepare for an appointment"})
    assert response.status_code == 503
