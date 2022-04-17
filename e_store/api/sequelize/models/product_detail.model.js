module.exports = (sequelize) => {
	sequelize.define('product_detail', {
		product_detail_id: {
			type: DataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		product_style: {
			type: DataType.STRING,
			allowNull: false,
		},
		material: {
			type: DataType.STRING,
			allowNull: false,
		},
		brand_name: {
			type: DataType.STRING,	
			allowNull: false,		
		},
    place_of_origin:{
        type: DataType.STRING,
        allowNull: false,
    },
    model_number:{
        type: DataType.STRING,
        allowNull: false,
    },  
     supple_ability:{
        type: DataType.STRING,
        allowNull: false,
    },
    product_id:{
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