const express = require('express');
// const routes = require('./routes');

const app = express();

app.use(express.json());
// app.use(routes); perdi

app.get('/', (req, res) => {
    return res.json({ messagem: 'perdi'});
});

app.listen(3000);
