const express = require('express');
const router = express.Router();
const Qpinfo = require('../models/qpdb');


router.get('/qps', (req, res)=> {
    Qpinfo.find({}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            const qps = docs;
            res.render('qps', {qps});
        }
    })
})

router.get('/delete/:id', (req, res)=>{
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

router.get('/edit/:id', (req, res)=>{
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

router.post('/updateqp', (req, res)=>{
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