//Nodemon helps to update immediately when you save the file so you don't have to keep stopping and restarting the server

import express from "express";
import data from './data/mock.json';

const app = express();

const PORT = 3000; //Not necessary but it's good if you change the value cause you only need to update in one spot

//Making sure that the app is listening on the PORT we specified
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
    console.log(data);
})

