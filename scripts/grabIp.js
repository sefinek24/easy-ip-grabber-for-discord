const axios = require('axios');
const geoIp = require('geoip-lite');
const { version } = require('../package.json');

module.exports = req => {
	const data = geoIp.lookup(req.ip) || { country: null, region: null, timezone: null };

	const embeds = [{
		color: 16330592,
		author : {
			name: `The user has visited the site ${req.hostname} (${process.env.NODE_ENV})`,
			icon_url: 'https://raw.githubusercontent.com/sefinek24/easy-ip-grabber-for-discord/main/images/swagcat.png',
		},
		description: `\`\`\`${req.headers['user-agent']}\`\`\``,
		fields: [
			{
				name: '» Address IP',
				value: `> ${req.ip}`,
				inline: true,
			},
			{
				name: '» Country',
				value: `> ${data.country || '\\❓'}`,
				inline: true,
			},
			{
				name: '» Region',
				value: `> ${data.region || '\\❓'}`,
				inline: true,
			},
			{
				name: '» Timezone',
				value: `> ${data.timezone || '\\❓'}`,
				inline: true,
			},
			{
				name: '» HTTP version',
				value: `> ${req.httpVersion}`,
				inline: true,
			},
			{
				name: '» Request',
				value: `> **${req.method}** ${req.url}`,
			},
		],
		footer: {
			text: `🌍 • Easy IP grabber for Discord Webhook - ${version}\n😸 • https://github.com/sefinek24/easy-ip-grabber-for-discord`,
		},
	}];

	const config = {
		method: 'POST',
		url: process.env.WEBHOOK_URL,
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify({ embeds }),
	};

	axios(config).catch(err => console.error('Webhook nie został wysłany.', err.message));
};