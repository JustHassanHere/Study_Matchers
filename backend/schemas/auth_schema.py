from pydantic import BaseModel

class RegisterUswer(BaseModel):
    username: str
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str
    