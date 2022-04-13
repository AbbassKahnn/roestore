// const dotenv = require("dotenv");

// // debug: true or false should be remove or null for production.
// const result = dotenv.config({ debug: false, override: true });
if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const port = process.env['APIPORT'] || 5000;
module.exports = {
	environment: process.env['NODE_ENV'] || 'development',
	port: process.env['APIPORT'] || 5000,
	dbconfig: {
		HOST: process.env['HOST'],
		USER: process.env['DBUSER'],
		PASSWORD: process.env['DBPASSWORD'],
		PORT: process.env['DBPORT'],
		DB: process.env['DB'],
	}
};