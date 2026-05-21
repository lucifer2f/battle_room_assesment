# Creative Room – AI Battle Platform

An AI-powered realtime creative battle room where users submit prompts and receive AI-generated campaign outputs.

---

# Features

- Realtime battle room UI
- Prompt submission system
- Async backend processing
- Gemini AI integration
- Live status updates
- SQLite database persistence
- Frontend + Backend architecture

---

# Tech Stack

## Frontend
- Next.js
- Tailwind CSS

## Backend
- FastAPI
- SQLAlchemy
- SQLite

## AI
- Google Gemini API

---

# Architecture

Frontend communicates with the FastAPI backend using REST APIs.

Flow:

User submits prompt
↓
Backend stores submission
↓
Background task processes request
↓
Gemini generates output
↓
Database updated
↓
Frontend polling refreshes UI

---

# Battle Mechanism

1. User enters a creative prompt
2. Prompt is submitted to backend
3. Backend queues submission
4. AI generates campaign output
5. Status updates:
   - queued
   - running
   - completed
6. Final AI output and score displayed in UI

---

# Setup Instructions

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```txt
http://localhost:3000
```

---

## Backend

```bash
cd backend

python3 -m venv venv

source venv/bin/activate

pip install fastapi uvicorn sqlalchemy google-generativeai python-dotenv
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs on:
```txt
http://127.0.0.1:8000
```

---

# Environment Variables

Create `.env` inside backend folder:

```env
GEMINI_API_KEY=your_api_key
```

---

# Tradeoffs

- Polling used instead of WebSockets for simpler realtime updates
- SQLite used for lightweight local persistence
- Scoring system currently rule-based and simplified

---

# Known Gaps

- No authentication
- No multi-room synchronization
- No persistent leaderboard
- No WebSocket realtime updates

---

# Future Improvements

- WebSocket integration
- Multiplayer rooms
- Real AI scoring
- AI image generation
- Leaderboards

Polling used instead of WebSockets for simplicity and faster implementation.
---

