const express = require('express');
const { hidePoweredBy } = require('helmet');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const open = require('open');
const grabIp = require('./scripts/grabIp.js');

const url = `http://127.0.0.1:${process.env.PORT}`;

const app = express();

app.use(hidePoweredBy());
app.use(favicon('images/swagcat.png'));
app.use(morgan('[:date[clf]]: :remote-addr - :remote-user ":method :url HTTP/:http-version" :status - ":user-agent"'));

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
	console.log(`Aplikacja uruchomiona na adresie ${url}\nDostępne podstrony: • /little-cats`);
	open(`${url}/little-cats`);
});