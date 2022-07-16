const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const qpsRoutes = require('./routes/qps');
const qpRoutes = require('./routes/qp');
const qpdetailRoutes = require('./routes/qpdetails');
const testRoutes = require('./routes/test');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const mongodbUri = "mongodb+srv://araj:araj@cluster0.flwcc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongodbUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'CodeBrew'
}).then(result => console.log("Connected to the database"))
.catch(error => console.log(error))

app.get('/', (req, res)=>{
    res.render('homepage');
})

app.use(qpsRoutes);
app.use(qpRoutes);
app.use(qpdetailRoutes);
app.use(testRoutes);
app.listen(3000, ()=> {
    console.log("Port running at port 3000");
})