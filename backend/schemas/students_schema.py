from pydantic import BaseModel
class Student(BaseModel):
    name: str
    level : str
    subjects: str
    age : int
