import json
import os
import uuid
from typing import List
from models import TeamMember

DATA_FILE = os.path.join(os.path.dirname(__file__), "members.json")

def load_members() -> List[TeamMember]:
    if not os.path.exists(DATA_FILE):
        return []
    
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
        return [TeamMember(**member) for member in data]

def save_members(members: List[TeamMember]):
    with open(DATA_FILE, "w") as f:
        json.dump([member.model_dump() for member in members], f, indent=4)

team_members = load_members()