from fastapi import APIRouter
from schemas.students_schema import Student
from database import students_collection

router = APIRouter()


@router.post("/students")
def add_student(student: Student):

    student_dict = student.dict()

    students_collection.insert_one(student_dict)

    return {
        "message": "student added"
    }


@router.get("/students")
def get_students():

    students = list(
        students_collection.find({}, {"_id": 0})
    )

    return students


@router.delete("/students/{name}")
def delete_student(name: str):

    students_collection.delete_one({"name": name})

    return {
        "message": "student deleted"
    }


@router.put("/students/{name}")
def update_student(name: str, student: Student):

    students_collection.update_one(
        {"name": name},
        {"$set": student.dict()}
    )

    return {
        "message": "student updated"
    }


@router.get("/match")
def match_students():

    students = list(
        students_collection.find({}, {"_id": 0})
    )

    groups = {}

    for student in students:

        subject = student["subject"]

        if subject not in groups:
            groups[subject] = []

        groups[subject].append(student)

    return groups