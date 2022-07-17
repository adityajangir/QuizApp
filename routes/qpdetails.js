const express = require('express');
const router = express.Router();
const Qpinfo = require('../models/qpdb');
const Qinfo = require('../models/questiondb')


router.get('/qp/:name', (req, res)=>{
    Qpinfo.findOne({name: req.params.name}, (err, docs) => {
        if(err){
            console.log(err);
        }else{
            const qpdata = docs;
            // console.log(docs);
            Qinfo.find({qpname: req.params.name}, (err, docs1)=> {
                if(err){
                    console.log(err);
                }else{
                    const qdata = docs1;
                    // console.log(qdata);
                    let totalTime = 0;
                    let totalMarks = 0;
                    qdata.forEach(element => {
                        totalTime += element.qtime;
                        totalMarks += element.marks;
                    });
                    // console.log(totalTime, totalMarks);
                    res.render('qpdetails', {qpdata, qdata, update: false, totalTime, totalMarks});
                }
            })
        }
    })
})

router.get('/qp/:qpname/:qname/delete', (req, res)=>{
    Qinfo.findOneAndRemove({qpname: req.params.qpname, qname: req.params.qname}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/qp/'+req.params.qpname);
        }
    })
})

router.get('/qp/:qpname/:qname/edit', (req, res)=>{
    Qinfo.findOne({qpname: req.params.qpname, qname: req.params.qname}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            const uqdata = docs;
            // console.log(uqdata);
            Qpinfo.findOne({name: req.params.qpname}, (err, docs2) => {
                if(err){
                    console.log(err);
                }else{
                    const qpdata = docs2;
                    // console.log(docs);
                    Qinfo.find({qpname: req.params.qpname}, (err, docs1)=> {
                        if(err){
                            console.log(err);
                        }else{
                            const qdata = docs1;

                            let totalTime = 0;
                            let totalMarks = 0;
                            qdata.forEach(element => {
                                totalTime += element.qtime;
                                totalMarks += element.marks;
                            });

                            res.render('qpdetails', {qpdata, qdata, uqdata, update: true, totalMarks, totalTime});
                        }
                    })
                }
            })
        }
    })
})

router.post('/updatequestion', async (req, res)=>{
    const data = req.body;
    // console.log(data);
    Qinfo.findOneAndRemove({qpname: data.qpname, qname: data.qname}, async (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(docs);
            const qdata = await Qinfo.create(req.body);
            res.redirect('/qp/'+data.qpname);
        }
    })
})

router.post('/addquestion', async (req, res)=> {
    // console.log(req.body);
    const qdata = await Qinfo.create(req.body);
    res.redirect('/qp/' + qdata.qpname);
})

module.exports = router;