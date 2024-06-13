'''import jwt

SECRET_KEY = "floriksecret"
# Расшифровка JWT токена
def verify_jwt(jwt_token):
    try:
        payload = jwt.decode(jwt_token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidSignatureError:
        return None
    except jwt.DecodeError:
        return None

# Использование '''
'''
import jwt


def decode_jwt_token(token, secret_key):
    
    payload = jwt.decode(token, secret_key, algorithms=["HS256"])
    return payload.get("sub")

# пример использования

'''
from jose import jwt

# Секретный ключ для расшифровки
secret_key = "floriksecret"

# Токен для расшифровки
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyIn0.ohC5x797nwGZn24sXPoV0GAJ5Y7xn097I1m7bl4XR2A"

def decode_jwt_token(token, secret_key):
    decoded_token = jwt.decode(token, secret_key, algorithms=["HS256"])
    print(decoded_token["sub"])

