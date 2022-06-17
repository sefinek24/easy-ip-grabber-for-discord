require('dotenv').config();

console.log('Kontrola pliku .env...');
if (!process.env.PORT) return console.warn('Wprowadź port do pliku .env.');
if (isNaN(process.env.PORT)) return console.warn('Podany port w pliku .env nie jest liczbą.');
if (!process.env.WEBHOOK_URL) return console.warn('Adres URL webhooka nie został podany.');

console.log('Trwa uruchamianie serwera www...\n');
require('./server.js');