const Config = require('../../config');

async function applySequelizeSetup(sequelize) {
	const {
		users,

	} = sequelize.models;
	// if (Config.environment === 'debug') {
	// 	
	// }
	await sequelize.sync();
}

module.exports = { applySequelizeSetup };
