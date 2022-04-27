const DataType = require('sequelize');
const dbConfig = require('../../../config').dbconfig;

module.exports = (sequelize) => {
	sequelize.define('users', {
		user_id: {
			type: DataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		user_name: {
			type: DataType.STRING,
			allowNull: false,
		},
		first_name: {
			type: DataType.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataType.STRING,			
		},
		email: {
			type: DataType.STRING,
			allowNull: false,	
			unique: true
		},
		address: {
			type: DataType.STRING,
			allowNull: false,	
		},
		password: {
			type: DataType.STRING,
			allowNull: false,	
		},
		created_at: {
			type: DataType.DATE,
		},
		updated_at: {
			type: DataType.DATE,
		},
		deleted_at: {
			type: DataType.DATE,
		},

	});
};
