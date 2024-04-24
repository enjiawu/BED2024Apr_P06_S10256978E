//Nodemon helps to update immediately when you save the file so you don't have to keep stopping and restarting the server

import express from "express";
import data from './data/mock.json' assert { type: 'json' }; //assert { type: 'json' }; is used to tell Node.js that the file is a JSON file so it can be imported as a JSON object

const app = express();

const PORT = 3000; //Not necessary but it's good if you change the value cause you only need to update in one spot

//Using the public folder at the root of the porject
app.use(express.static('public')); //This will allow us to use the public folder at the root of the project

//Using the imags folder at the route /images
app.use(express.static('/images', express.static('images'))); //This will allow us to use the images folder at the route /images 

//GET
app.get('/', (request, response) => { //Usually https method takes two arguments, the path and the handler. The handler is the function that will be executed when the path is found
    response.json(data); //The response is what the server sends back to the client. In this case, we are sending back the data object as a JSON object
}) 

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


//Making sure that the app is listening on the PORT we specified
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
    console.log(data);
})

