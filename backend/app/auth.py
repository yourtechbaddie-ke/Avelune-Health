"""AWS Cognito access-token verification for Avelune's API.

This module verifies signed Cognito access tokens. It does not create accounts,
assign roles, or grant resource access; those require application-side policy.
"""
import os
from dataclasses import dataclass
from functools import lru_cache
from typing import Any

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


@dataclass(frozen=True)
class CognitoSettings:
    region: str
    user_pool_id: str
    app_client_id: str

    @property
    def issuer(self) -> str:
        return f"https://cognito-idp.{self.region}.amazonaws.com/{self.user_pool_id}"

    @property
    def jwks_uri(self) -> str:
        return f"{self.issuer}/.well-known/jwks.json"

    @classmethod
    def from_env(cls) -> "CognitoSettings | None":
        region = os.getenv("AWS_COGNITO_REGION", "").strip()
        pool_id = os.getenv("AWS_COGNITO_USER_POOL_ID", "").strip()
        client_id = os.getenv("AWS_COGNITO_APP_CLIENT_ID", "").strip()
        if not all((region, pool_id, client_id)):
            return None
        if not pool_id.startswith(f"{region}_"):
            raise RuntimeError("AWS_COGNITO_USER_POOL_ID must belong to AWS_COGNITO_REGION")
        return cls(region=region, user_pool_id=pool_id, app_client_id=client_id)


bearer_scheme = HTTPBearer(auto_error=False)


@lru_cache(maxsize=8)
def _jwks_client(uri: str) -> jwt.PyJWKClient:
    return jwt.PyJWKClient(uri, cache_keys=True)


def roles_from_groups(groups: Any) -> list[str]:
    """Map only explicitly assigned Cognito groups to application role labels."""
    allowed = {
        "avelune-patient": "patient",
        "avelune-caregiver": "caregiver",
        "avelune-clinician": "clinician",
        "avelune-admin": "admin",
    }
    if not isinstance(groups, list):
        return []
    return sorted({allowed[group] for group in groups if isinstance(group, str) and group in allowed})


def verify_cognito_access_token(token: str, settings: CognitoSettings) -> dict[str, Any]:
    signing_key = _jwks_client(settings.jwks_uri).get_signing_key_from_jwt(token)
    claims = jwt.decode(
        token,
        signing_key.key,
        algorithms=["RS256"],
        issuer=settings.issuer,
        options={"verify_aud": False, "require": ["exp", "iat", "sub", "token_use", "client_id"]},
    )
    if claims.get("token_use") != "access":
        raise jwt.InvalidTokenError("A Cognito access token is required")
    if claims.get("client_id") != settings.app_client_id:
        raise jwt.InvalidTokenError("Token was issued to a different Cognito app client")
    return claims


async def require_current_principal(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict[str, Any]:
    settings = CognitoSettings.from_env()
    if settings is None:
        raise HTTPException(status_code=503, detail="Authentication is not configured on this deployment.")
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="A valid access token is required.", headers={"WWW-Authenticate": "Bearer"})
    try:
        claims = verify_cognito_access_token(credentials.credentials, settings)
    except (jwt.PyJWTError, RuntimeError, ValueError):
        raise HTTPException(status_code=401, detail="The access token is invalid or expired.", headers={"WWW-Authenticate": "Bearer"})
    groups = claims.get("cognito:groups", [])
    return {
        "subject": claims["sub"],
        "groups": groups if isinstance(groups, list) else [],
        "roles": roles_from_groups(groups),
    }
