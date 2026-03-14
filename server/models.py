from pydantic import BaseModel
from typing import Optional

class TeamMember(BaseModel):
    id: Optional[str] = None
    name: str
    role: str
    bio: str
    photo_url: str
    linkedin: Optional[str] = None