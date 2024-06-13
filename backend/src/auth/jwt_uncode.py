
from jose import jwt


def decode_jwt_token(token, secret_key):
    decoded_token = jwt.decode(token, secret_key, algorithms=["HS256"])
    print(decoded_token["sub"])

