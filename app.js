if(process.env.NODE_ENV!== 'production'){
    require('dotenv').config()
}

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const qpsRoutes = require('./routes/qps');
const qpRoutes = require('./routes/qp');
const qpdetailRoutes = require('./routes/qpdetails');
const testRoutes = require('./routes/test');
const methodOverride = require('method-override');
const users = [];
const initializePassport = require('./passport-config.js');
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(qpsRoutes);
app.use(qpRoutes);
app.use(qpdetailRoutes);
app.use(testRoutes);

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

app.get('/adminregister', (req,res)=>{
    res.render('admin-register');
})

app.post('/adminregister', async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        console.log(users);
        res.redirect('/adminlogin')
    }catch{
        res.redirect('/adminregister')
    }
})


app.get('/adminlogin', (req,res)=>{
    res.render('admin-login')
})

app.post('/adminlogin', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/adminlogin',
    failureFlash: true
}))

app.delete('/logout', (req, res)=>{
    req.logout();
    req.redirect('/adminlogin');
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/adminlogin');
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next();
}

app.listen(3000, ()=> {
    console.log("Port running at port 3000");
})