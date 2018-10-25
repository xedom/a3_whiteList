const express = require('express');
const app = express();
const apiRout = require('./api');
const bodyParser = require('body-parser');
const fs = require('fs');
const access = require('./config.json');
const port = process.env.port || access.port;
console.log('\033[2J');

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(express.static('static'));
app.set('views', './')
app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/api',apiRout);

app.post('/login', (req, res) => {
    if(req.body.token === access.adminPassword) {
        return res.status(200).json( req.body );
    } else {
        return res.status(406).json({ error: "Key errata" });
    };
});

app.get('/lista', (req,res) => {
    let jData = fs.readFileSync('./jData.json', 'utf8') && JSON.parse(fs.readFileSync('./jData.json', 'utf8')) || [];
  
    res.set('Content-Type', 'text/plain');
    if(req.query.type && req.query.type == 'json') {
        res.send(jData);
    } else if (req.query.type && req.query.type == 'array') {
        res.send('['+ '[' +jData.map(el => `"${el.uid}"`)+ ']' + '['+jData.map(el => `"${el.name}"`)+']' +']');
    } else {
        if(req.query.filter && req.query.filter == 'nome') {
            res.send(jData.map(el => {
                return `${el.name}`
            }).join(`\n`));
        } else if(req.query.filter && req.query.filter == 'uid') {
            res.send(jData.map(el => {
                return `${el.uid}`
            }).join(`\n`));
        } else {
            res.send(jData.map(el => {
                return `${el.uid} ${el.name}`
            }).join(`\n`));
        };
    };
});

app.listen(port, () => {
    console.log(`Sito avviato sulla porta ${port}`);
});