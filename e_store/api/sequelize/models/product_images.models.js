const DataType = require('sequelize');
const dbConfig = require('../../../config').dbconfig;

module.exports = (sequelize) => {
	sequelize.define('product_images', {
		product_images_id: {
			type: DataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		image_title: {
			type: DataType.STRING,
			allowNull: false,
		},
		image: {
			type: DataType.STRING,
			allowNull: false,
		},
		description: {
			type: DataType.STRING,	
			allowNull: false,		
		},
        product_id: {
			type: DataType.INTEGER,	
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

