const express = require('express');
const router = express.Router();
const {v4: uuidV4} = require('uuid');
const Tuserinfo = require('../models/tuser');

router.get('/test/:qpname', (req, res)=>{
    res.render('testlog', {testname: req.params.qpname});
})

router.post('/verifyuser', async (req, res)=>{
    // console.log(req.body);
    Tuserinfo.findOne({userid: req.body.userid}, async (err, docs)=>{
        if(err){
            console.log(err);
            // res.redirect(`/test/${req.body.testname}`);
        }else{
            if(!docs){
                const data = await Tuserinfo.create(req.body)
                // console.log(data);
                res.redirect(`/test/${data.testname}/${data.userid}`);
            }else{
                res.redirect(`/test/${req.body.testname}`);
            }
        }
    })
})

router.get('/test/:testname/:userid', (req, res)=>{
    
})

module.exports = router;