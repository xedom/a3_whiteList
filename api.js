const express = require('express');
const rout = express.Router();

jData = [
    { name: 'raudomanna', uid: 77338929340948347 },
    { name: 'xancex', uid: 79342981891589762 },
    { name: 'sansone23', uid: 70294075105901901 },
    { name: 'bennysound', uid: 78284339032289526 },
    { name: 'messeno', uid: 74852852983498345 }
];

rout.get('/', (req,res) => {
    res.json(jData)
});

rout.delete('/', (req,res) => {
    jData = jData.filter(el => {
        if (req.body.uid == el.uid) return false;
        return true;
    });
    
    res.json({status: true})
});

rout.post('/', (req,res) => {
    jData = [...jData, req.body];
    res.json(req.body);
});

module.exports = rout;