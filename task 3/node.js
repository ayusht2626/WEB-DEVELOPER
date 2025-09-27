// Task: Create a REST API to Manage a List of Books using Node.js and Express

// 1. Initialize project with: npm init -y
// 2. Install Express: npm install express

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// 4. Create an array to store book objects
let books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 2, title: "1984", author: "George Orwell" },
];

// 5. GET /books - return all books
app.get("/books", (req, res) => {
  res.json(books);
});

// 6. POST /books - add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1, // auto-increment ID
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// 7. PUT /books/:id - update a book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// 8. DELETE /books/:id - remove a book
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);
  res.json({ message: "Book deleted successfully", book: deletedBook[0] });
});

// 3. Setup basic Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/*
9. Test Endpoints in Postman:

➡ GET    http://localhost:3000/books
➡ POST   http://localhost:3000/books 
   Body: { "title": "Book Name", "author": "Author Name" }
➡ PUT    http://localhost:3000/books/1 
   Body: { "title": "Updated Title", "author": "Updated Author" }
➡ DELETE http://localhost:3000/books/1
*/
