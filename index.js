require('dotenv').config();

if (!process.env.PORT) return console.warn('Please enter port to the .env file.');
if (isNaN(process.env.PORT)) return console.warn('The specified port is not a number. Please check your .env file.');
if (!process.env.WEBHOOK_URL) return console.warn('The Webhook URL was not given.');

console.log('Please wait...');
require('./server.js');