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
    const uniqueId = uuidV4();
    const quespname = req.params.qpname;
    // console.log(uniqueId);
    res.redirect(`/test/${req.params.qpname}/${uniqueId}/${req.body.testuser}`);
    // Tuserinfo.findOne({testname: req.params.qpname, userid: uniqueId}, async (err, docs)=>{
    //     if(err){
    //         console.log(err);
    //         // res.redirect(`/test/${req.body.testname}`);
    //     }else{
    //         if(!docs){
    //             const quespname = req.params.qpname;
    //             const data = await Tuserinfo.create({testname: quespname, userid: uniqueId});
    //             // console.log(data);
    //             res.redirect(`/test/${data.testname}/${data.userid}`);
    //         }else{
    //             res.redirect(`/test/${req.body.testname}`);
    //         }
    //     }
    // })
})

router.get('/test/:testname/:userid/:testuser',  (req, res)=>{
    Tuserinfo.find({userid: req.params.userid}, async (err, docs3)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(docs3);
            if(!docs3.length){
                const data = await Tuserinfo.create({testname: req.params.testname, userid: req.params.userid, testuser: req.params.testuser});
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
                                if(docs1.length===0){
                                    // console.log(docs1.length);
                                    res.redirect(`/test/${req.params.testname}`);
                                }
                                res.render('quiz', {docs: JSON.stringify(docs1), userid, totalTime});
                            }
                        })
                    }
                })
            }else{
                res.redirect(`/${req.params.testname}/${req.params.userid}/complete`);
            }
        }
    })
    const userid = req.params.userid;
    var totalTime = 0;
    
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
    const userid1 = req.params.userid;
    // let data = [];
    Ainfo.find({qpname, userid: userid1}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(docs);
            let score = 0;
            // console.log(docs);
            for(a in docs){
                score += docs[a].score;
                // console.log(score);
            }
            Tuserinfo.findOneAndUpdate({userid: userid1, testname: qpname}, {$set: { totalscore: score }}, {upsert: false}, function(err, docsx){
                if(err){
                    console.log(err);
                }else{
                    // console.log(docsx);
                }
            })
            res.render('finish', {score});
        }
    })
})

module.exports = router;