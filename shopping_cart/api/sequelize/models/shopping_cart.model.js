module.exports = (sequelize) => {
	sequelize.define('product_detail', {
		shopping_cart_id: {
			type: DataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		product_id: {
			type: DataType.INTEGER,
			allowNull: false,
		},
		user_id: {
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