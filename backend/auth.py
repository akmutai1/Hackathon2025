# /backend/auth.py
import json
from os import environ as env
from urllib.request import urlopen
from flask import request
from jose import jwt
from authlib.integrations.flask_oauth2 import ResourceProtector
from joserfc.jwk import JWKRegistry
from authlib.jose.rfc7518 import JWS_ALGORITHMS

# This is a helper class from Authlib docs to validate the Auth0 token
class Auth0JWTBearerTokenValidator:
    def __init__(self, domain, audience):
        self.issuer = f"https://{domain}/"
        self.audience = audience
        self.registry = JWKRegistry()
        self.update_jwks()

    def update_jwks(self):
        url = f"{self.issuer}.well-known/jwks.json"
        data = urlopen(url)
        jwks = json.loads(data.read())
        for key in jwks['keys']:
            self.registry.import_key(key)

    def __call__(self, token_string):
        try:
            token = jwt.decode(
                token_string,
                self.registry.get_key,
                algorithms=['RS256'],
                audience=self.audience,
                issuer=self.issuer
            )
            return token
        except jwt.JWTError as e:
            print(f"JWT Error: {e}")
            return None

# Get Auth0 details from .env file (which you should create)
AUTH0_DOMAIN = env.get("AUTH0_DOMAIN")
AUTH0_AUDIENCE = env.get("AUTH0_AUDIENCE")

# Create the validator and resource protector
require_auth = ResourceProtector()
validator = Auth0JWTBearerTokenValidator(AUTH0_DOMAIN, AUTH0_AUDIENCE)
require_auth.register_token_validator(validator)