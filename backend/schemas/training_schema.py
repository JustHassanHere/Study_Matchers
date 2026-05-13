from pydantic import BaseModel

class TrainingField(BaseModel):
    title : str
    company : str
    capacity : int
    available_slots : int
    location : str
    description : str  