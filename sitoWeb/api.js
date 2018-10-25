const express = require('express');
const rout = express.Router();
const fs = require('fs');
const access = require('./config.json');

rout.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

const auth = function (req, res, next) {
	
	if(req.headers.token === access.adminPassword) next();
	else res.status(406).json({error:"Ti devi prima loggare"});
};

rout.get('/', (req,res) => {
	let jData = fs.readFileSync('./jData.json', 'utf8') && JSON.parse(fs.readFileSync('./jData.json', 'utf8')) || [];
	res.json(jData);
});

rout.delete('/', auth, (req,res) => {
	let jData = fs.readFileSync('./jData.json', 'utf8') && JSON.parse(fs.readFileSync('./jData.json', 'utf8')) || [];
	jData = jData.filter(el => {
		if (req.body.uid == el.uid) return false; return true;
	});

	fs.writeFileSync('./jData.json',JSON.stringify(jData));
	res.json({status: true});
});

rout.post('/', auth, (req,res) => {
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