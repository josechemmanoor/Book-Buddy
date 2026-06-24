from pydantic import BaseModel

class BookCreate(BaseModel):
    title: str
    author: str
    genre: str
    status: str
    progress: int = 0
    rating: int | None = None
    notes: str | None = None


class BookResponse(BookCreate):
    id: int

    class Config:
        from_attributes = True