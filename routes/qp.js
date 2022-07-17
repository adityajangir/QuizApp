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


router.get('/qpcreate', checkAuthenticated, (req, res)=> {
    res.render('qpcreate', {update: false});
})

router.post('/addqp', checkAuthenticated, async (req, res)=> {
    // console.log(req.body);
    const qdata = await Qpinfo.create(req.body);
    res.redirect('/qp/'+ qdata.name);
})

module.exports = router;