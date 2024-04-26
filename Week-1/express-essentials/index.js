//Nodemon helps to update immediately when you save the file so you don't have to keep stopping and restarting the server

import express, { request, response } from "express";
import data from './data/mock.json' assert { type: 'json' }; //assert { type: 'json' }; is used to tell Node.js that the file is a JSON file so it can be imported as a JSON object

const app = express();

const PORT = 3000; //Not necessary but it's good if you change the value cause you only need to update in one spot

//Using the public folder at the root of the porject
app.use(express.static('public')); //This will allow us to use the public folder at the root of the project

//Using the imags folder at the route /images
app.use('/images', express.static('images')); //This will allow us to use the images folder at the route /images 

//Using express.json and express.urlencoded
//app.use(express.json()); //We are specifying that we want our request to be JSON
app.use(express.urlencoded({ extended: true })); //We are specifying that we want our request to be URL encoded, extended true gives more of a JSON like experience

//GET
app.get('/', (request, response) => { //Usually https method takes two arguments, the path and the handler. The handler is the function that will be executed when the path is found
    response.json(data); //The response is what the server sends back to the client. In this case, we are sending back the data object as a JSON object
}) 

//POST - express.json and express.urlencoded
app.post('/item', (request, response) => {
    console.log(request.body);
    response.json(request.body); //The request.body property is the parsed body of the request.
})

//GET - download method
app.get('/download', (request, response) => { //The download method is used to download a file from the server
    response.download("images/mountains_2.jpeg")
}) 

//GET - redirect method
app.get('/redirect', (request, response) => { 
    response.redirect("http://www.linkedin.com"); 
}) 

//GET with next()
app.get('/next', (request, response, next) => {
    console.log("The response will be sent by the next function.")
    next(); //This will call the next function in the middleware stack
}, (request, response) => {
    response.send("I just set up a route with a second callback.");
}) 

//GET with Routing Parameters
app.get("/class/:id", (request, response) => {
    //Middleware: Access the routing parameters
    const studentId = Number(request.params.id); 
 
    const student = data.filter((student) => student.id === studentId);
    //Everything above this line is middleware
    response.send(student); 
})

app.route('/class').get((request, response,) => {
    //response.send("Retrieve class info")
    throw new Error("This is an error");
})
.post((request, response) => {
    response.send("Create class info")
})
.put((request, response) => {
    response.send("Update class info")
})

//Route chaining
//GET
/*app.get('/class', (request, response,) => {
   response.send("Retrieve class info")
})

//POST
app.post('/class', (request, response) => {
    response.send("Create class info")
})

//PUT
app.put('/class', (request, response) => {
    response.send("Update class info")
})*/

//POST
app.post('/create', (request, response) => { 
    response.send("This is a POST request at /create"); 
}) 

//PUT
app.put('/edit', (request, response) => { 
    response.send("This is a PUT request at /edit"); 
}) 

//DELETE
app.delete('/delete', (request, response) => { 
    response.send("This is a DELETE request at /delete"); 
}) 

//Error Handling Middleware
app.use((err, req, res, next) => {
    console.log(err.stack); //Stack represents stack trace of the error
    res.status(500).send("Something is broken!");
})

//Making sure that the app is listening on the PORT we specified
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
})

