const express = require('express');
const rout = express.Router();
const fs = require('fs');

// jData = [
//     { name: 'raudomanna', uid: 76561198169125185 },
//     { name: 'xancex', uid: 76561198073570585 },
//     { name: 'sansone23', uid: 70294075105901901 },
//     { name: 'bennysound', uid: 76561198169211100 },
//     { name: 'messeno', uid: 76561198098958461 }
// ];

rout.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

rout.get('/', (req,res) => {
    let jData = fs.readFileSync('./jData.json', 'utf8') && JSON.parse(fs.readFileSync('./jData.json', 'utf8')) || [];
    res.json(jData);
});

rout.delete('/', (req,res) => {
    let jData = fs.readFileSync('./jData.json', 'utf8') && JSON.parse(fs.readFileSync('./jData.json', 'utf8')) || [];
    jData = jData.filter(el => {
        if (req.body.uid == el.uid) return false;
        return true;
    });
    
    fs.writeFileSync('./jData.json',JSON.stringify(jData));
    res.json({status: true})
});

rout.post('/', (req,res) => {
    let jData = fs.readFileSync('./jData.json', 'utf8') && JSON.parse(fs.readFileSync('./jData.json', 'utf8')) || [];
    jData = [...jData, {name:req.body.name, uid:parseInt(req.body.uid)}];

    fs.writeFileSync('./jData.json',JSON.stringify(jData));
    res.status(200).json(req.body);
    // res.status(404).json({error:'sei nabbo'});
});

module.exports = rout;