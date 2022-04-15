const Config = require('../../config');

async function applySequelizeSetup(sequelize) {
	const {
		product
	} = sequelize.models;
	// if (Config.environment === 'debug') {
	// 	
	// }
	await sequelize.sync();
}

module.exports = { applySequelizeSetup };
