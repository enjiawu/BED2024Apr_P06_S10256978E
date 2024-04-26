//Importing Express and body-parser
const express = require('express');
const bodyParser = require("body-parser");

//Instantiating the Express app: Creating an instance of the Express app using express()
const app = express();

//Defining the port
const port = 3000;

//In-memory Book Data: Creating an array to store book data
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
 ];

 //Middleware
//Parsing JSON data
//app.use(bodyParser.json());

//Parsing URL-ennconded Form data: to configure body-parser to handle URL-encoded form data. Setting extended: true allows parsing of nested objects within the form data.
app.use(bodyParser.urlencoded({ extended: true }));

//GET Request: Getting all the books
app.get('/books', (req, res) => {
    res.json(books); // Send the array of books as JSON response
 });

 //POST Request: Adding a new book
 app.post('/books', (req, res) => {
    const newBook = req.body; // Get the new book data from the request body
    newBook.id = books.length + 1; // Assign a unique ID
    books.push(newBook); // Add the new book to the array
    res.status(201).json(newBook); // Send created book with status code 201
});

//GET Request: Getting a Single Book
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const book = books.find(book => book.id === bookId);
  
    if (book) {
      res.json(book); // Send the book data if found
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
});

//PUT Request: Updating a Book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const updatedBook = req.body; // Get updated book data from request body
  
    const bookIndex = books.findIndex(book => book.id === bookId);
  
    if (bookIndex !== -1) {
      updatedBook.id = bookId;
      books[bookIndex] = updatedBook; // Update book data in the array
      res.json(updatedBook); // Send updated book data
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
});

//DELETE Request: Deleting a Book
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
  
    const bookIndex = books.findIndex(book => book.id === bookId);
  
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1); // Remove book from the array
      res.status(204).send(); // Send empty response with status code 204 (No Content)
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
});

//Starting the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

