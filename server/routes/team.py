from fastapi import APIRouter
from models import TeamMember
from database import team_members
import uuid

router = APIRouter()

@router.get("/team")
def get_team():
    return team_members


@router.post("/team")
def add_member(member: TeamMember):
    member.id = str(uuid.uuid4())
    team_members.append(member)
    return member


@router.put("/team/{member_id}")
def update_member(member_id: str, member: TeamMember):
    for i in range(len(team_members)):
        if team_members[i].id == member_id:
            member.id = member_id
            team_members[i] = member
            return member
    return {"error": "Member not found"}


@router.delete("/team/{member_id}")
def delete_member(member_id: str):
    for i in range(len(team_members)):
        if team_members[i].id == member_id:
            team_members.pop(i)
            return {"message": "Deleted"}

    return {"error": "Member not found"}