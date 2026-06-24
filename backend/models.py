from sqlalchemy import Column, Integer, String, Text
from database import Base

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)
    author = Column(String)
    genre = Column(String)

    status = Column(String)

    progress = Column(Integer, default=0)

    rating = Column(Integer, nullable=True)

    notes = Column(Text, nullable=True)