const { StatusCodes } = require('http-status-codes');
const { ReasonPhrases } = require('http-status-codes');
const { QueryTypes } = require('sequelize');
const ErrorKey = require('../constants/errorKeys');
const ResponseModel = require('../constants/response.constant');
const sequelize = require('../sequelize');
const Axios = require('axios');

/**
 * Sample function get only all carts from database. 
 * @returns 
 */
exports.getAllShoppingCartDetail = async (req, res, next) => {
	const response = new ResponseModel();
	try {
		const ShoppingCart = await sequelize.query(
			`
    SELECT *
    FROM shopping_cart
    `,
			{
				type: QueryTypes.SELECT
			}
		);
		console.info('all records are fetched from database');
		response.setData(ShoppingCart);
		response.setStatus(ReasonPhrases.OK);
		return res.status(StatusCodes.OK).send(response);
	} catch (err) {
		if (err.ValidationError || err.SyntaxError || err.ForeignKeyConstraintError) {
			req.body = {
				errorKey: ErrorKey.BAD_REQUEST
			};
			return next();
		}
		req.body = {
			errorKey: ErrorKey.PARTIAL_CONTENT
		};
		return next();
	}
};

/**
 * This function is uses for micro service to get all cart from database by user id
 * and user id received from req params.
 * This function call another service which get all product from the productService app by product ids.
 * @returns my Cart
 */
exports.getAllShoppingCartByUserId = async (req, res, next) => {
	const response = new ResponseModel();
	try {
		const ShoppingCart = await sequelize.query(
			`
  SELECT *
  FROM shopping_cart
  where user_id = '${req.params.user_id}'
  `,
			{
				type: QueryTypes.SELECT
			}
		);

	// create only product id array from the above query result.	
    const product_ids = []
    ShoppingCart.map(ele =>{
      product_ids.push(ele.product_id);
    });

    const shoppingCartArr = [];
    
	// Product service called with product ids array as req params
    const product = await Axios.get(`http://localhost:5001/product/service/${product_ids}`)
	
	//Bind product with shopping cart by matching product (product id) with cart (product id) and
	// push product object with cart detail in shoppingCartArr. 
    for(let i= 0; i<product_ids.length; i++){
      for(let j=0; j<product.data.data.length; j++){
        if(product_ids[i] === product.data.data[j].product_id){
          product.data.data[j].shopping_cart_id = ShoppingCart[i].shopping_cart_id;
          shoppingCartArr.push(product.data.data[j])
        }
      }
    }

		console.info('all records are fetched from database');
		response.setData(shoppingCartArr);
		response.setStatus(ReasonPhrases.OK);
		return res.status(StatusCodes.OK).send(response);
	} catch (err) {
		if (err.ValidationError || err.SyntaxError || err.ForeignKeyConstraintError) {
			req.body = {
				errorKey: ErrorKey.BAD_REQUEST
			};
			return next();
		}
		req.body = {
			errorKey: ErrorKey.PARTIAL_CONTENT
		};
		return next();
	}
};

/**
 * This function create new shopping cart in database.
 * @returns created
 */
exports.postShoppingCart = async (req, res, next) => {
	const response = new ResponseModel();
	const { product_id, user_id } = req.body;
	try {

		// check if new cart already created.
		let cart = await sequelize.query(
			`
      select * from shopping_cart 
      where product_id= '${product_id}' and user_id = '${user_id}'
      `,
			{
				type: QueryTypes.SELECT
			}
		);
		// check if cart not created the create cart else return already created cart.
		if (cart.length <= 0) {
			cart = await sequelize.query(
				`
            INSERT INTO shopping_cart
            (
              product_id,
              user_id
            )
            values(
                '${product_id}',
                '${user_id}'
              )     
            `,
				{
					type: QueryTypes.INSERT
				}
			);
		}
		response.setData(cart);
		response.setStatus(ReasonPhrases.CREATED);
		return res.status(StatusCodes.CREATED).send(response);
	} catch (err) {
		if (err.ValidationError || err.SyntaxError || err.ForeignKeyConstraintError) {
			req.body = {
				errorKey: ErrorKey.BAD_REQUEST
			};
			return next();
		}
		req.body = {
			errorKey: ErrorKey.PARTIAL_CONTENT
		};
		return next();
	}
};

exports.updateShoppingCart = async (req, res, next) => {
	const response = new ResponseModel();
	const { shopping_cart_id, user_id, product_id } = req.body;
	try {
		const updateshopping_cart = await sequelize.query(
			`
         UPDATE shopping_cart
          SET 
          product_id = '${product_id}',           
          user_id = '${user_id}' 
          WHERE  shopping_cart_id ='${shopping_cart_id}'
   
          `,
			{
				type: QueryTypes.UPDATE
			}
		);
		response.setData(updateshopping_cart);
		response.setStatus(ReasonPhrases.OK);
		return res.status(StatusCodes.OK).send(response);
	} catch (err) {
		console.log('🚀 ~ file: shoppingCart.controller.js ~ line 109 ~ exports.updateShoppingCart=async ~ err', err);
		if (err.ValidationError || err.SyntaxError || err.ForeignKeyConstraintError) {
			req.body = {
				errorKey: ErrorKey.BAD_REQUEST
			};
			return next();
		}
		req.body = {
			errorKey: ErrorKey.PARTIAL_CONTENT
		};
		return next();
	}
};

// This function is delete cart by cart id and cart id received in req params.
exports.deleteShoppingCart = async (req, res, next) => {
	const response = new ResponseModel();
	try {
		const delshoppingcart = await sequelize.query(
			`
    DELETE FROM shopping_cart
    WHERE shopping_cart_id = ${req.params.id}
    
    `,
			{
				type: QueryTypes.DELETE
			}
		);
		console.info('shopping cart  deleted successfully');
		response.setData('deleted successfully');
		response.setStatus(ReasonPhrases.OK);
		return res.status(StatusCodes.OK).send(response);
	} catch (err) {
		console.log('🚀 ~ file: shoppingCart.controller.js ~ line 144 ~ exports.deleteShoppingCart ~ err', req.body);
		if (err.ValidationError || err.SyntaxError || err.ForeignKeyConstraintError) {
			req.body = {
				errorKey: ErrorKey.BAD_REQUEST
			};
			return next();
		}
		req.body = {
			errorKey: ErrorKey.PARTIAL_CONTENT
		};
		return next();
	}
};
