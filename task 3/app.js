// nodeapp.js
// REST API to Manage Books using Node.js & Express

// 1. Import Express
const express = require("express");
const app = express();

// 2. Middleware to parse JSON
app.use(express.json());

// 3. Sample data storage (Array of books)
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" },
  { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
];

// 4. GET /books - Fetch all books
app.get("/books", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books
  });
});

// 5. POST /books - Add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: "Title and Author are required!"
    });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: newBook
  });
});

// 6. PUT /books/:id - Update a book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found!"
    });
  }

  book.title = title || book.title;
  book.author = author || book.author;

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book
  });
});

// 7. DELETE /books/:id - Remove a book
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Book not found!"
    });
  }

  const removedBook = books.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: removedBook[0]
  });
});

// 8. Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:3000/books`);
  console.log("📚 Ready to manage your books!");
});
