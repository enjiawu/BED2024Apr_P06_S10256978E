const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController"); // Import controllers

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json()); // Parse incoming JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

const validateBook = require("./middlewares/validateBook");
const requestLog = require("./middlewares/requestLog");

// Define individual routes for each controller function
app.get("/books", requestLog, booksController.getAllBooks);
app.get("/books/:id", requestLog, booksController.getBookById);
app.delete("/books/:id", requestLog, booksController.deleteBook);
app.post("/books", requestLog, validateBook, booksController.createBook); // Add validateBook before createBook
app.put("/books/:id", requestLog, validateBook, booksController.updateBook); // Add validateBook before updateBook

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
