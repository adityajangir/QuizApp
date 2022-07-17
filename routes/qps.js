const express = require('express');
const router = express.Router();
const Qpinfo = require('../models/qpdb');


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


router.get('/qps', checkAuthenticated, (req, res)=> {
    Qpinfo.find({}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            const qps = docs;
            res.render('qps', {qps});
        }
    })
})

router.get('/delete/:id', checkAuthenticated, (req, res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    Qpinfo.findByIdAndDelete(id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });
    res.redirect('/qps')
})

router.get('/edit/:id', checkAuthenticated, (req, res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    Qpinfo.findById(id, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            const qpdata = docs;
            res.render('qpcreate', {qpdata, update: true});
        }
    })
    // Qpinfo.findByIdAndUpdate(id, function (err, docs) {
    //     if (err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log("Deleted : ", docs);
    //     }
    // });
    // res.redirect('/qps')
})

router.post('/updateqp', checkAuthenticated, (req, res)=>{
    const qpname = req.body.qpname;
    Qpinfo.findOneAndDelete({qpname}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            const data = Qpinfo.create(req.body);
            res.redirect('/qps')
        }
    })
})

module.exports = router;