const express = require('express');
const router = express.Router();
const Qpinfo = require('../models/qpdb');


router.get('/qpcreate', (req, res)=> {
    res.render('qpcreate', {update: false});
})

router.post('/addqp', async (req, res)=> {
    // console.log(req.body);
    const qdata = await Qpinfo.create(req.body);
    res.redirect('/qp/'+ qdata.name);
})

module.exports = router;