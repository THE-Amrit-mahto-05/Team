# Armatrix Team Page - Software Dev Intern Assignment

A cinematic, interactive Team Page built for Armatrix. Featuring a 3D robotic background, a "hacker HUD" aesthetic, and a full team management system.

## 🚀 Deployed Links
- **Frontend:** [Coming Soon]
- **Backend:** [Coming Soon]

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm/yarn

### Backend (FastAPI)
1. `cd server`
2. `python -m venv venv`
3. `source venv/bin/activate` (Mac/Linux) or `venv\Scripts\activate` (Windows)
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload`

### Frontend (Next.js)
1. `cd client`
2. `npm install`
3. Create a `.env.local` file and add: `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`
4. `npm run dev`

---

## 🎨 Design Decisions

### Theme: Robotic HUD / Hacker
The project is designed with a "Cybernetic" aesthetic, shifting from generic blue/black to a sophisticated industrial palette (Teal + Slate + Deep Zinc). Key elements include:
- **3D Robotics:** A persistent Canvas rendering robotic arms that react to mouse movements.
- **Binary Rain:** falling digital sequences on profile hover.
- **Glitch Effects:** Realistic image glitches representing high-speed data streams.
- **Horizontal Scroll:** A cinematic journey through team members, connected by neural threads.

### Tech Stack
- **Frontend:** Next.js (App Router), Framer Motion (Animations), Three.js (3D Elements), TailwindCSS.
- **Backend:** FastAPI (Python), Pydantic (Models), In-memory storage (easily swappable for DB).

---

## ✅ Features Implemented
- [x] **Cinematic Intro:** animated "OUR TEAM" entry sequence.
- [x] **Dynamic Background:** 3D robotic arms and HUD elements.
- [x] **Team Management (Admin):** Dedicated `/admin` route for full CRUD operations.
- [x] **Mobile Responsive:** Adaptive layout that switches to a vertical flow for mobile users.
- [x] **Interactive UI:** Smooth transitions, hacker themes, and real-time cursor tracking.

---

Built with ❤️ by Amrit Kumar Mahto for Armatrix.
