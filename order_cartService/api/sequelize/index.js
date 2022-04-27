'user strict';

const { Sequelize } = require('sequelize');
const Config = require('../../config');

const dbConfig = Config.dbconfig;
const { applySequelizeSetup } = require('./extra-setup');

const sequelize = new Sequelize(
	process.env.DB,
	process.env.DBUSER,
	process.env.DBPASSWORD,
	{
	  host: process.env.HOST,
	  port: process.env.DBPORT,
	  dialect: "mysql",
	  dialectOptions: {
		timezone: "local",
		dateStrings: true,
		typeCast: true,
	  },
	  logging: console.log,
	  timezone: "Europe/Brussels",
	  //timezone: '+05:30' //for writing to database
	});

const modelDefiners = [
	require('./models/shopping_cart.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	try {
		modelDefiner(sequelize);
	} catch (e) {
		console.error('Throw error', e);
	}
}
// We execute any extra setup after the models are defined, such as adding associations.
applySequelizeSetup(sequelize);
module.exports = sequelize;
