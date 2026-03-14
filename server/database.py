import uuid
from models import TeamMember

team_members = [
    TeamMember(
        id=str(uuid.uuid4()),
        name="Arjun Rao",
        role="Controls Engineer",
        bio="Specializes in non-linear control systems and dynamic balancing for bipedal robots.",
        photo_url="https://randomuser.me/api/portraits/men/32.jpg",
        linkedin="https://linkedin.com"
    ),
    TeamMember(
        id=str(uuid.uuid4()),
        name="Sarah Chen",
        role="Computer Vision Lead",
        bio="Architecting visual SLAM pipelines and real-time object detection models.",
        photo_url="https://randomuser.me/api/portraits/women/44.jpg",
        linkedin="https://linkedin.com"
    ),
    TeamMember(
        id=str(uuid.uuid4()),
        name="Marcus Johnson",
        role="Hardware Architect",
        bio="Designs lightweight, high-torque actuator systems and custom PCB layouts.",
        photo_url="https://randomuser.me/api/portraits/men/86.jpg",
        linkedin="https://linkedin.com"
    ),
    TeamMember(
        id=str(uuid.uuid4()),
        name="Elena Vasquez",
        role="Machine Learning Researcher",
        bio="Focuses on reinforcement learning for autonomous locomotion and grasping.",
        photo_url="https://randomuser.me/api/portraits/women/68.jpg",
        linkedin="https://linkedin.com"
    ),
    TeamMember(
        id=str(uuid.uuid4()),
        name="David Kim",
        role="Software Systems Engineer",
        bio="Building the low-latency communication middleware and core engine.",
        photo_url="https://randomuser.me/api/portraits/men/55.jpg",
        linkedin="https://linkedin.com"
    ),
    TeamMember(
        id=str(uuid.uuid4()),
        name="Aisha Patel",
        role="Product Manager",
        bio="Translating complex robotic capabilities into seamless human-centered experiences.",
        photo_url="https://randomuser.me/api/portraits/women/32.jpg",
        linkedin="https://linkedin.com"
    )
]