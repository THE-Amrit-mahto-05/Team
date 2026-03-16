# Armatrix Team Page - Software Dev Intern Assignment

A cinematic, interactive Team Page built for Armatrix. Featuring a 3D robotic background, a "hacker HUD" aesthetic, and a full team management system.

## 🚀 Deployed Links
- **Frontend (Vercel):** [Coming Soon]
- **Backend (Render):** https://armatrix-team-page-7inp.onrender.com
- **API Documentation:** https://armatrix-team-page-7inp.onrender.com/docs

##  Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm/yarn

### Backend (FastAPI)
1. `cd server`
2. `python -m venv venv`
3. `source venv/bin/activate` (Mac/Linux) or `venv\Scripts\activate` (Windows)
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload --port 8000`
   - Access API at `http://127.0.0.1:8000`
   - Interactive Docs: `http://127.0.0.1:8000/docs`

### Frontend (Next.js)
1. `cd client`
2. `npm install`
3. Create a `.env.local` file and add: `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`
4. `npm run dev`
   - Access Team Page: `http://localhost:3000/team`
   - Access Admin Dashboard: `http://localhost:3000/admin`

---

## Design Decisions

### Theme: Robotic HUD / Hacker
The project is designed with a "Cybernetic" aesthetic, shifting from generic blue/black to a sophisticated industrial palette (Teal + Slate + Deep Zinc). Key elements include:
- **3D Robotics:** A persistent Canvas rendering robotic arms that react to mouse movements (Three.js + React Three Fiber).
- **Cinematic Experience:** A custom intro sequence and horizontal scrolling journey through the team.
- **Neural Threads:** Visual connections between team members representing the collaborative network at Armatrix.
- **Admin HUD:** A dedicated system-style dashboard for real-time team management.

### Tech Stack
- **Frontend:** Next.js (App Router), Framer Motion, Three.js, TailwindCSS.
- **Backend:** Python + FastAPI, Pydantic, JSON-based persistent storage.

---

## Features Implemented
- [x] **Full CRUD API:** Add, Edit, Delete, and Reorder team members.
- [x] **Cinematic Intro:** High-impact animated "OUR TEAM" entry sequence.
- [x] **Interactive 3D Background:** Dynamic robotic arm visualization.
- [x] **Admin Dashboard:** System-style UI for managing the team list.
- [x] **Team Reordering:** Drag-and-drop style reordering logic in the admin panel.
- [x] **Responsive Design:** Seamless transition between desktop cinematic scroll and mobile vertical flow.
- [x] **Auto-Documentation:** Interactive Swagger UI at `/docs`.

---
