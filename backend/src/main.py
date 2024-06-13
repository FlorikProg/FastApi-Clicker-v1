from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.responses import JSONResponse
from auth.models import User, Base
from auth.manager import *
from auth.schemes import *
from fastapi import Depends
from sqlalchemy.orm import Session
from auth.jwt_uncode import *
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.future import select

from sqlalchemy.orm import sessionmaker

SECRET_KEY = ""
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = create_engine("sqlite:///./Data/users.db", echo=True)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@app.post("/register")
def register_user(user: UserCreate):
    db = SessionLocal()
    user_obj = get_user(db, user.username)
    if user_obj:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
 


@app.post("/login")
def login_user(login_item: LoginClass):
    db = SessionLocal()
    user = get_user(db, login_item.username)
    if not user or not verify_password(login_item.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    global encoded_jwt
    encoded_jwt = jwt.encode({"sub": user.username}, SECRET_KEY, algorithm=ALGORITHM)
    response = JSONResponse(content={"message": "Logged in successfully"})

    return encoded_jwt

@app.get("/")
def read_root():
    return "Hello"



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/addclick")
async def add_click(jwt: str, clicks: int, db: Session = Depends(get_db)):
    payload = decode_jwt_token(jwt, SECRET_KEY)
    print(payload)
    
    user = db.query(User).filter(User.username == payload).first()

    try:
        user.click += clicks
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error while adding clicks: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while adding clicks")
    
    return {"message": "Click added", "clicks": user.click}

class UserDisplay(BaseModel):
    id: int
    username: str
    click: int


@app.get('/all_users', response_model=list[UserDisplay])
def all_users(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.click.desc()).all()
    return users
