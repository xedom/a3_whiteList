const express = require('express');
const app = express();
const port = process.env.port || 8000;

app.use(express.static('public'));
app.set('view engine','pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8000, () => {
    console.log(`Sito avviato sulla porta ${port}`);
});