from fastapi import APIRouter, HTTPException
from models import TeamMember
from database import team_members, save_members
import uuid

router = APIRouter()

@router.get("/team")
def get_team():
    return team_members


@router.post("/team")
def add_member(member: TeamMember):
    member.id = str(uuid.uuid4())
    team_members.append(member)
    save_members(team_members)
    return member


@router.put("/team/{member_id}")
def update_member(member_id: str, member: TeamMember):
    for i in range(len(team_members)):
        if team_members[i].id == member_id:
            member.id = member_id
            team_members[i] = member
            save_members(team_members)
            return member
    raise HTTPException(status_code=404, detail="Member not found")


@router.delete("/team/{member_id}")
def delete_member(member_id: str):
    for i in range(len(team_members)):
        if team_members[i].id == member_id:
            team_members.pop(i)
            save_members(team_members)
            return {"message": "Deleted"}

    raise HTTPException(status_code=404, detail="Member not found")


@router.post("/team/reorder")
def reorder_team(ordered_ids: list[str]):
    global team_members
    id_map = {m.id: m for m in team_members}
    new_team = []
    for member_id in ordered_ids:
        if member_id in id_map:
            new_team.append(id_map[member_id])
    
    # Add any missing ones at the end just in case
    existing_ids = set(ordered_ids)
    for m in team_members:
        if m.id not in existing_ids:
            new_team.append(m)
            
    team_members[:] = new_team
    save_members(team_members)
    return team_members