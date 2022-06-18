const express = require('express');
const { hidePoweredBy } = require('helmet');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const { join } = require('path');
const open = require('open');
const grabIp = require('./scripts/grabIp.js');
const url = `http://127.0.0.1:${process.env.PORT}`;

const app = express();

app.use(hidePoweredBy());
app.use(favicon('images/swagcat.png'));
app.use(express.static('public'));
app.use(morgan('[:date[clf]]: :remote-addr - :remote-user ":method :url HTTP/:http-version" :status - ":user-agent"'));

app.get('*', (req, res, next) => {
	grabIp(req);
	next();
});

app.get('/', (req, res) => {
	res.status(503).sendFile(join(__dirname + '/www/errors/503.html'));
});

app.get('/little-cats', (req, res) => {
	res.status(500).sendFile(join(__dirname + '/www/errors/500.html'));
});

app.listen(process.env.PORT, () => {
	console.log(`» Aplikacja uruchomiona na porcie ${process.env.PORT}\n» Dostępne punkty końcowe\n  • ${url} (zwraca fake błąd 503)\n  • ${url}/little-cats (zwraca fake błąd 500)\n`);

	if (process.env.NODE_ENV === 'production') open(`${url}/little-cats`);
});