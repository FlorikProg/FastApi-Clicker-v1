from passlib.context import CryptContext
from auth.models import User

pwd_context = CryptContext(schemes=["bcrypt"])

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, username: str):
    return db.query(User).filter(User.username == username).first()
