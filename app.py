from fastapi import FastAPI 
from pydantic import BaseModel
from pydantic import Field
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import pandas as pd



Base = declarative_base()

app = FastAPI()
@app.get("/")
def home():
    return {"message": "Study API"}
class student(BaseModel):
    name: str
    level : str
    subjects: str
    age : int = Field(gt=0)
    students =[]

@app.post("/add-student")
def add_student(student: student):

    student.append(student)

    return {
        "message": "student added",
        "total_students": len(student)
    }
@app.get("/student")
def get_student():
    return student

def match_students():
    groups = {}
    for student in student:
        subject = student.subject
        if subject not in groups:
            groups[subject] =[]
            groups[subject].append(student)
            return groups

@app.get("/match")
def match():
    groups = match_students()

    return groups

engine = create_engine("sqlite:///study_matcher.db")
base = declarative_base()
session = sessionmaker(bind=engine)
session = session()
session.add(student)
session.commit()


