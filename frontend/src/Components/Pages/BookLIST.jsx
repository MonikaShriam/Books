import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookLIST() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [books, setBooks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentBook, setCurrentBook] = useState({});

  const fetchBooks = () => {
    axios.get("http://localhost:3003/get").then((result) => {
      setBooks(result.data);
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addOrUpdateBook = (e) => {
    e.preventDefault();
    const newBook = {
      Title: title,
      Author: author,
      Category: category,
      Published_Year: publishedYear,
    };

    if (edit) {
      axios
        .put(`http://localhost:3003/update/${currentBook._id}`, newBook)
        .then(() => {
          fetchBooks();
          resetForm();
        });
    } else {
      axios.post("http://localhost:3003/add", newBook).then(() => {
        fetchBooks();
        resetForm();
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setCategory("");
    setPublishedYear("");
    setEdit(false);
    setCurrentBook({});
  };

  const handleEdit = (book) => {
    setTitle(book.Title);
    setAuthor(book.Author);
    setCategory(book.Category);
    setPublishedYear(book.Published_Year);
    setEdit(true);
    setCurrentBook(book);
  };

  const handleDelete = (book) => {
    axios.delete(`http://localhost:3003/delete/${book._id}`).then(() => {
      fetchBooks();
    });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Book List</h2>
      <form onSubmit={addOrUpdateBook} className="mb-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Published Year"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary w-100">
          {edit ? "Update Book" : "Add Book"}
        </button>
      </form>

      <ul className="list-group">
        {books.map((book) => (
          <li
            key={book._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{book.Title}</strong> by {book.Author} ({book.Category},{" "}
              {book.Published_Year})
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => handleEdit(book)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(book)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
