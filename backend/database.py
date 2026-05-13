from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client["study_matcher"]

students_collection = db["students"]
user_collection = db["users"]
training_collection = db["training_fields"]
reservation_collection = db["reservations"]


