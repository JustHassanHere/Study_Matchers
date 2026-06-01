from fastapi import APIRouter, Depends
from database import students_collection, training_collection
from utils.auth_dependency import get_current_user

router = APIRouter()


@router.get("/smart-match")
def smart_match(current_user = Depends(get_current_user)):

    students = list(students_collection.find({}, {"_id": 0}))
    trainings = list(training_collection.find({}, {"_id": 0}))

    results = []

    for student in students:
        student_subject = student.get("subjects", "").lower()

        best_match = None
        best_score = 0

        for training in trainings:
            if training.get("available_slots", 0) <= 0:
                continue

            training_title = training.get("title", "").lower()
            training_desc  = training.get("description", "").lower()
            training_comp  = training.get("company", "").lower()

            score = 0

            # Check if student subject keywords match training info
            for keyword in student_subject.split():
                if keyword in training_title:
                    score += 3  # title match = strongest signal
                if keyword in training_desc:
                    score += 2  # description match
                if keyword in training_comp:
                    score += 1  # company match

            if score > best_score:
                best_score = score
                best_match = training

        results.append({
            "student": student,
            "matched_training": best_match,
            "match_score": best_score,
            "match_status": "Matched" if best_match else "No Match Found"
        })

    return results