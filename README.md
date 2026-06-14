# AI Hire — LLM-Powered Resume Matching Platform

🔗 **Live Demo:** https://ai-hire-phi.vercel.app

An end-to-end AI recruitment tool that matches resumes to job descriptions with semantic scoring, ATS simulation, and AI-generated suggestions.

## Features

- 📄 Upload resume PDF → AI extracts structured profile (skills, experience, education)
- 💼 Paste any job description → AI extracts requirements
- 🤖 ATS score simulation — keyword hit rate, format issues, recommendations
- 📊 Semantic rubric scoring across 5 dimensions (not just keyword overlap)
- 🔍 Gap analysis with narrative explanation
- ✨ AI-generated resume improvement suggestions + rewritten summary
- 👥 Recruiter dashboard with candidate ranking

## Tech Stack

**Backend:** Python · FastAPI · Pydantic v2 · Google Gemini API · PyMuPDF  
**Frontend:** React 18 · Vite · Axios  
**Deployed on:** Render (backend) · Vercel (frontend)

## Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env`:
```
GOOGLE_API_KEY=your_key_here
```

```bash
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## API Docs

Visit http://localhost:8000/docs for full Swagger UI.

## Architecture

```
Resume PDF + Job Description
         ↓
   FastAPI Backend
         ↓
  LLM Extraction (Gemini)
  ├── CandidateProfile (Pydantic)
  └── JobRequirements (Pydantic)
         ↓
  ATS Scorer (algorithmic)
  + Semantic Matcher (Gemini)
         ↓
  MatchAnalysis + SuggestionReport
         ↓
   React Frontend Dashboard
```