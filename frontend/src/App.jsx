import { useState, useEffect } from "react";
import axios from "axios";

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
  status: "Reading",
  progress: "",
  rating: "",
  notes: "",
});

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
  };

  const statCardStyle = {
    flex: 1,
    textAlign: "center",
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

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
  status: "Reading",
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
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "25px",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "20px",
        }}
      >
        Book Buddy
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div style={statCardStyle}>
          <h3>{stats.total}</h3>
          <p>Total Books</p>
        </div>

        <div style={statCardStyle}>
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>

        <div style={statCardStyle}>
          <h3>{stats.reading}</h3>
          <p>Reading</p>
        </div>

        <div style={statCardStyle}>
          <h3>{stats.wishlist}</h3>
          <p>Wishlist</p>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <h2>Add Book</h2>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          style={inputStyle}
        />

        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
          style={inputStyle}
        />

        <input
          placeholder="Genre"
          value={form.genre}
          onChange={(e) =>
            setForm({ ...form, genre: e.target.value })
          }
          style={inputStyle}
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
          style={inputStyle}
        >
          <option>Reading</option>
          <option>Completed</option>
          <option>Wishlist</option>
        </select>

        <label>Reading Progress (%)</label>

        <input
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
  style={inputStyle}
/>

        <label>Rating</label>

        <select
  value={form.rating}
  onChange={(e) =>
    setForm({
      ...form,
      rating: e.target.value,
    })
  }
  style={inputStyle}
>
  <option value="">Select Rating</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
          style={{
            ...inputStyle,
            height: "80px",
          }}
        />

        <button
          onClick={addBook}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Book
        </button>
      </div>

      <h2>My Books</h2>

      {books.map((book) => (
        <div
          key={book.id}
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "15px",
          }}
        >
          <h3>{book.title}</h3>

          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Status:</strong> {book.status}</p>
          <p><strong>Progress:</strong> {book.progress}%</p>
          <p><strong>Rating:</strong> ⭐ {book.rating}</p>
          <p><strong>Notes:</strong> {book.notes}</p>

          <button
            onClick={() => deleteBook(book.id)}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;