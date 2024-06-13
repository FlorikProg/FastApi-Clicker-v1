from pydantic import BaseModel

class LoginClass(BaseModel):
    username: str
    password: str
    click: int

class UserCreate(BaseModel):
    username: str
    password: str
    click: int