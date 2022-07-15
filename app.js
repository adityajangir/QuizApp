const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.get('/createquiz', (req, res)=> {
    res.send("hello");
})



app.listen(3000, ()=> {
    console.log("Port running at port 3000");
})