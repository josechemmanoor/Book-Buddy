from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, Base, engine
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Book Buddy API"}

@app.post("/books")
def create_book(
    book: schemas.BookCreate,
    db: Session = Depends(get_db)
):
    new_book = models.Book(**book.dict())

    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    return new_book

@app.get("/books")
def get_books(db: Session = Depends(get_db)):
    return db.query(models.Book).all()

@app.delete("/books/{book_id}")
def delete_book(
    book_id: int,
    db: Session = Depends(get_db)
):
    book = (
        db.query(models.Book)
        .filter(models.Book.id == book_id)
        .first()
    )

    if book:
        db.delete(book)
        db.commit()

    return {"message": "Deleted"}
@app.get("/stats")
def get_stats(
    db: Session = Depends(get_db)
):
    books = db.query(models.Book).all()

    return {
        "total": len(books),
        "completed": len([b for b in books if b.status == "Completed"]),
        "reading": len([b for b in books if b.status == "Reading"]),
        "wishlist": len([b for b in books if b.status == "Wishlist"])
    }
@app.get("/stats")
def get_stats(
    db: Session = Depends(get_db)
):
    books = db.query(models.Book).all()

    return {
        "total": len(books),
        "completed": len(
            [b for b in books
             if b.status == "Completed"]
        ),
        "reading": len(
            [b for b in books
             if b.status == "Reading"]
        ),
        "wishlist": len(
            [b for b in books
             if b.status == "Wishlist"]
        )
    }