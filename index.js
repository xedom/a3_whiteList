const express = require('express');
const app = express();
const port = process.env.port || 8080;
const apiRout = require('./api');
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.set('views', './')
app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/api',apiRout);

app.listen(8000, () => {
    console.log(`Sito avviato sulla porta ${port}`);
});