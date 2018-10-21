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
		if (req.body.uid == el.uid) return false; return true;
	});
	
	fs.writeFileSync('./jData.json',JSON.stringify(jData));
	res.json({status: true})
});

rout.post('/', (req,res) => {
	let jData = fs.readFileSync('./jData.json', 'utf8') && JSON.parse(fs.readFileSync('./jData.json', 'utf8')) || [];
	
	if (req.body.name && req.body.uid) {
		if (typeof req.body.name != 'string') {
			res.status(406).json({error:"Errore con il nome"});
		} else if ((typeof parseInt(req.body.uid) != 'number') || (parseInt(req.body.uid).toString().length != 17)) {
			res.status(406).json({error:`Errore con l'id (l'id deve essere composto da 17 numeri){${parseInt(req.body.uid).toString().length}}`,msg:parseInt(req.body.id)});
		} else {
			jData = [...jData, {name:req.body.name, uid:parseInt(req.body.uid)}];
	
			fs.writeFileSync('./jData.json',JSON.stringify(jData));
			res.status(200).json(req.body);
		}
	} else {
		res.status(406).json({error:"Manga il nome o l'id"});
	}
});

module.exports = rout;