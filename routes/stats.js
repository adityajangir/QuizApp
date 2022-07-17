const express = require('express');
const router = express.Router();
const Qpinfo = require('../models/qpdb');


router.get('/qp/:qpname/stats', (req, res)=>{
    res.render('stats');
})


module.exports = router;