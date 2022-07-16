const express = require('express');
const router = express.Router();
const {v4: uuidV4} = require('uuid');
const Tuserinfo = require('../models/tuser');
const Qinfo = require('../models/questiondb');
const { json } = require('body-parser');
const Ainfo = require('../models/answers');

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

router.get('/test/:testname/:userid',  (req, res)=>{
    const userid = req.params.userid;
    Qinfo.find({qpname: req.params.testname}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            docs = JSON.parse(JSON.stringify(docs))
            res.render('quiz', {docs: JSON.stringify(docs), userid});
        }
    })
})

router.post('/storeans',async (req, res)=>{
    const ansdata = await Ainfo.create(req.body);
    // console.log(ansdata);
})

router.get('/:qpname/:userid/complete', (req, res)=>{
    qpname = req.params.qpname;
    userid = req.params.userid;
    Ainfo.find({qpname, userid}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            let score = 0;
            for(a in docs){
                const questionid = docs[a].quesitonid;
                Qinfo.findOne({questionid}, (err, docs1)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(docs[a].answer, docs1.answer)
                        if(docs[a].answer == docs1.answer){
                            score += docs1.marks;
                        }
                        console.log(score);
                        // console.log(docs1);
                    }
                })
            }
        }
    })
})

module.exports = router;