const express = require("express");
const booksController = require("./controllers/booksController");
const sql = require("mssql"); // Assuming you've installed mssql
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); //Import body-parser
const validateBook = require("./middlewares/validateBook"); //Import validateBook middleware
const { getAllBooks } = require("./models/books");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

const staticMiddleware = express.static("public"); // Path to the public folder

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.use(staticMiddleware); // Mount the static middleware

//Routes for GET requests
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.get("/books-count", booksController.getBooksCount);

//Routes for POST requests
app.post("/books", validateBook, booksController.createBook);

//Routes for PUT requests
app.put("/books/:id", validateBook, booksController.updateBook);

//Routes for DELETE requests
app.delete("/books/:id", booksController.deleteBook);

app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig); //Establish a connection to the database using the configuration details in dbConfig
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
// Usually sent when you terminate the application using Ctrl+C
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});

