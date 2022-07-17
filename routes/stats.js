const express = require('express');
const router = express.Router();
const Qpinfo = require('../models/qpdb');
const Qinfo = require('../models/questiondb')
const Tuserinfo = require('../models/tuser');
const Ainfo = require('../models/answers');


router.get('/qp/:qpname/stats', async (req, res)=>{
    const qpname = req.params.qpname;
    const quess = await Qinfo.find({qpname});
    quess.forEach(async ques => {
        const docs1 = await Ainfo.find({qpname, questionid: ques._id});
    })
    Tuserinfo.find({testname: qpname}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(docs);
            res.render('stats', {docs});
        }
    })
})


module.exports = router;