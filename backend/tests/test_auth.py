import pytest
from fastapi.testclient import TestClient

from app.auth import CognitoSettings, roles_from_groups
from app.main import app

client = TestClient(app)


def test_cognito_settings_are_disabled_until_all_public_settings_exist(monkeypatch):
    for key in ("AWS_COGNITO_REGION", "AWS_COGNITO_USER_POOL_ID", "AWS_COGNITO_APP_CLIENT_ID"):
        monkeypatch.delenv(key, raising=False)
    assert CognitoSettings.from_env() is None


def test_cognito_settings_build_expected_issuer(monkeypatch):
    monkeypatch.setenv("AWS_COGNITO_REGION", "af-south-1")
    monkeypatch.setenv("AWS_COGNITO_USER_POOL_ID", "af-south-1_example")
    monkeypatch.setenv("AWS_COGNITO_APP_CLIENT_ID", "public-client-id")
    settings = CognitoSettings.from_env()
    assert settings is not None
    assert settings.issuer == "https://cognito-idp.af-south-1.amazonaws.com/af-south-1_example"
    assert settings.jwks_uri.endswith("/.well-known/jwks.json")


def test_cognito_pool_must_match_configured_region(monkeypatch):
    monkeypatch.setenv("AWS_COGNITO_REGION", "af-south-1")
    monkeypatch.setenv("AWS_COGNITO_USER_POOL_ID", "us-east-1_example")
    monkeypatch.setenv("AWS_COGNITO_APP_CLIENT_ID", "public-client-id")
    with pytest.raises(RuntimeError):
        CognitoSettings.from_env()


def test_only_known_explicit_cognito_groups_map_to_roles():
    assert roles_from_groups([
        "avelune-patient", "avelune-clinician", "unknown", "avelune-clinician"
    ]) == ["clinician", "patient"]
    assert roles_from_groups(["avelune-admin"]) == ["admin"]
    assert roles_from_groups("avelune-admin") == []


def test_auth_config_is_disabled_without_cognito_settings(monkeypatch):
    for key in ("AWS_COGNITO_REGION", "AWS_COGNITO_USER_POOL_ID", "AWS_COGNITO_APP_CLIENT_ID"):
        monkeypatch.delenv(key, raising=False)
    response = client.get("/v1/auth/config")
    assert response.status_code == 200
    assert response.json() == {"configured": False, "provider": "aws-cognito"}


def test_auth_me_rejects_requests_when_cognito_is_not_configured(monkeypatch):
    for key in ("AWS_COGNITO_REGION", "AWS_COGNITO_USER_POOL_ID", "AWS_COGNITO_APP_CLIENT_ID"):
        monkeypatch.delenv(key, raising=False)
    response = client.get("/v1/auth/me")
    assert response.status_code == 503
