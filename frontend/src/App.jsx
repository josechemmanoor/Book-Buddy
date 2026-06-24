import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    reading: 0,
    wishlist: 0,
  });

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    status: "",
    progress: "",
    rating: "",
    notes: "",
  });

  const loadBooks = async () => {
    const res = await axios.get("http://127.0.0.1:8000/books");
    setBooks(res.data);
  };

  const loadStats = async () => {
    const res = await axios.get("http://127.0.0.1:8000/stats");
    setStats(res.data);
  };

  useEffect(() => {
    loadBooks();
    loadStats();
  }, []);

  const addBook = async () => {
    await axios.post(
      "http://127.0.0.1:8000/books",
      form
    );

    setForm({
      title: "",
      author: "",
      genre: "",
      status: "",
      progress: "",
      rating: "",
      notes: "",
    });

    await loadBooks();
    await loadStats();
  };

  const deleteBook = async (id) => {
    await axios.delete(
      `http://127.0.0.1:8000/books/${id}`
    );

    await loadBooks();
    await loadStats();
  };

  return (
    <div className="container">
      <h1 className="title">Book Buddy</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Books</p>
        </div>

        <div className="stat-card">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h3>{stats.reading}</h3>
          <p>Reading</p>
        </div>

        <div className="stat-card">
          <h3>{stats.wishlist}</h3>
          <p>Wishlist</p>
        </div>
      </div>

      <div className="form-card">
        <h2>Add Book</h2>

        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Author"
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Genre"
          value={form.genre}
          onChange={(e) =>
            setForm({ ...form, genre: e.target.value })
          }
        />

        <label className="label">
          Reading Status
        </label>

        <select
          className="input"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="">
            Select Status
          </option>
          <option value="Reading">
            Reading
          </option>
          <option value="Completed">
            Completed
          </option>
          <option value="Wishlist">
            Wishlist
          </option>
        </select>

        <label className="label">
          Reading Progress (%)
        </label>

        <input
          className="input"
          type="number"
          min="0"
          max="100"
          placeholder="Enter progress (0-100)"
          value={form.progress}
          onChange={(e) =>
            setForm({
              ...form,
              progress: e.target.value,
            })
          }
        />

        <label className="label">
          Rating
        </label>

        <select
          className="input"
          value={form.rating}
          onChange={(e) =>
            setForm({
              ...form,
              rating: e.target.value,
            })
          }
        >
          <option value="">
            Select Rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label className="label">
          Notes
        </label>

        <textarea
          className="textarea"
          placeholder="Enter your notes"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
        />

        <button
          className="add-btn"
          onClick={addBook}
        >
          Add Book
        </button>
      </div>

      <h2>My Books</h2>

      {books.map((book) => (
        <div
          key={book.id}
          className="book-card"
        >
          <h3>{book.title}</h3>

          <p>
            <strong>Author:</strong>{" "}
            {book.author}
          </p>

          <p>
            <strong>Genre:</strong>{" "}
            {book.genre}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {book.status}
          </p>

          <p>
            <strong>Progress:</strong>{" "}
            {book.progress}%
          </p>

          <p>
            <strong>Rating:</strong> ⭐{" "}
            {book.rating}
          </p>

          <p>
            <strong>Notes:</strong>{" "}
            {book.notes}
          </p>

          <button
            className="delete-btn"
            onClick={() =>
              deleteBook(book.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;