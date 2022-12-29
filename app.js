const port = process.env.PORT || 3000;
const express = require('express');
const { run } = require('./scrapper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => {
    res.send('index');
});

app.post("/:handle", (req, res) => {
    handle = req.body.username;
    run(handle, res);
});

app.get('/:handle', (req, res) => {
    const handle = req.params.handle.trim();
    run(handle, res);
});

app.listen(port, () => { console.log(`listens at ${port}`); });