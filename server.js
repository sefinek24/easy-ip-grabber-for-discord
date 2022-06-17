const express = require('express');
const morgan = require('morgan');
const path = require('path');
const grabIp = require('./scripts/grabIp.js');
const { hidePoweredBy } = require('helmet');

const app = express();

app.use(hidePoweredBy());
app.use(morgan('combined'));

app.get('*', (req, _, next) => {
	grabIp(req);
	next();
});

app.get('/', (req, res) => {
	res.status(503).sendFile(path.join(__dirname + '/www/errors/503.html'));
});

app.get('/little-cats', (req, res) => {
	res.status(500).sendFile(path.join(__dirname + '/www/index.html'));
});

app.listen(process.env.PORT, () => {
	console.log(`App is running at http://127.0.0.1:${process.env.PORT}`);
});