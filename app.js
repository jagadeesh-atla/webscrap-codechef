const port = process.env.PORT || 3000;
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const clean = require('./cleaner');
const { run } = require('./scrapper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/:handel', (req, res) => {
    const handel = req.params.handel.trim();
    run(handel, res);
});

app.listen(port, () => { console.log(`listens at ${port}`); });