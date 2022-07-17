const express = require('express');
const router = express.Router();
const {v4: uuidV4} = require('uuid');
const Tuserinfo = require('../models/tuser');
const Qinfo = require('../models/questiondb');
const { json } = require('body-parser');
const Ainfo = require('../models/answers');
const Qpinfo = require('../models/qpdb');

router.get('/test/:qpname', (req, res)=>{
    res.render('testlog', {testname: req.params.qpname});
})

router.post('/:qpname/verifyuser', async (req, res)=>{
    // console.log(req.body);
    Tuserinfo.findOne({testname: req.params.qpname, userid: req.body.userid}, async (err, docs)=>{
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
    var totalTime = 0;
    Qpinfo.findOne({name: req.params.testname}, (err,docs)=>{
        if(err){
            console.log(err);
        }else{
            totalTime += docs.totaltime;
            Qinfo.find({qpname: req.params.testname}, (err, docs1)=>{
                if(err){
                    console.log(err);
                }else{
                    docs1 = JSON.parse(JSON.stringify(docs1))
                    res.render('quiz', {docs: JSON.stringify(docs1), userid, totalTime});
                }
            })
        }
    })
})

router.post('/storeans',async (req, res)=>{
    const ans = req.body.answer;
    Qinfo.findById(req.body.questionid, async (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(ans, docs.answer);

            if(docs.answer == ans){
                const score = docs.marks;
                const ansdata = await Ainfo.create({...req.body, score});
            }else{
                const score = 0;
                const ansdata = await Ainfo.create({...req.body, score});
                // console.log(ansdata);
            }
        }
    })
    // console.log(ansdata);
})

router.get('/:qpname/:userid/complete', (req, res)=>{
    const qpname = req.params.qpname;
    const userid = req.params.userid;
    // let data = [];
    Ainfo.find({qpname, userid}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(docs);
            let score = 0;
            for(a in docs){
                score += docs[a].score;
            }
            Tuserinfo.findOneAndUpdate({userid}, {$set: { totalscore: score }}, {upsert: true}, function(err, docsx){
                if(err){
                    console.log(err);
                }else{
                    console.log(docsx);
                }
            })
            // Tuserinfo.findOne({userid}, (err, docs)=>{
            //     if(err){
            //         console.log(err);
            //     }else{
            //         console.log(docs);
            //     }
            // })
            res.render('finish', {score});
        }
    })
    // console.log(data);
})

module.exports = router;