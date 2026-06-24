# Book Buddy

A full-stack reading tracker application built using React, FastAPI, and SQLite.

## Features

- Add books
- Delete books
- Track reading progress
- Rate books
- Add notes
- Reading statistics dashboard

## Tech Stack

Frontend:
- React
- Axios

Backend:
- FastAPI
- SQLAlchemy

Database:
- SQLite

## Setup

### Backend

```bash
cd backend
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

GET /books

POST /books

DELETE /books/{id}

GET /stats