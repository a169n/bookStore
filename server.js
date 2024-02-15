const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("public"));

require("dotenv").config();

const Books = require("./models/bookSchema");
const { connectDB } = require("./config/db");

connectDB();

app.get("/", (req, res) => {
  res.status(200).sendFile("index.html");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Books.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /books/filter?genre=Fiction
app.get("/books/filter", async (req, res) => {
  try {
    const filters = req.query;
    const filteredBooks = await Books.find(filters);
    res.status(200).json(filteredBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/books/sort/:sortBy", async (req, res) => {
  try {
    const sortBy = req.params.sortBy;
    const books = await Books.find({}).sort(sortBy);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/books/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const books = await Books.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/books/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Books.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await Books.create(bookData);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await Books.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndDelete(req.params.bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/books", async (req, res) => {
  try {
    await Books.deleteMany({});
    res.status(200).json({ message: "All data cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
