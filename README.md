# Book Buddy

## Overview

Book Buddy is a full-stack reading tracker application built using React, FastAPI, and SQLite. It helps users organize their reading journey by managing books, tracking reading progress, maintaining notes, rating completed books, and viewing reading statistics.

---

## Features

### Core Features

* Add books with title, author, genre, and reading status
* Track reading progress (0–100%)
* Add ratings for books
* Add personal notes
* Delete books from the collection
* View reading statistics:

  * Total Books
  * Completed Books
  * Currently Reading
  * Wishlist

### Additional Features

* Genre-based book recommendations
* Progress bar visualization
* Responsive and user-friendly interface

---

## Tech Stack

### Frontend

* ReactJS
* Axios
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy

### Database

* SQLite

---

## Project Structure

```text
book-buddy/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── books.db
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
cd book-buddy
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install fastapi uvicorn sqlalchemy pydantic

uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint    | Description                 |
| ------ | ----------- | --------------------------- |
| GET    | /books      | Retrieve all books          |
| POST   | /books      | Add a new book              |
| DELETE | /books/{id} | Delete a book               |
| GET    | /stats      | Retrieve reading statistics |

---

## Database

The application uses SQLite for persistent storage. SQLAlchemy ORM is used for database operations and table management.

---

## Future Enhancements

* AI-powered book recommendations
* Search and filter books
* User authentication
* ISBN-based book import
* Reading analytics and charts
* AI-generated book reviews

---

## Author

**Jose Chemmanoor**

B.Tech Computer Science and Engineering
