const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getallshoppingcartdetail = async(req,res,next) => {
    const response = new ResponseModel();
    try {
    const shoppingcart = await sequelize.query(`
    SELECT *
    FROM shopping_cart
    `,{
        type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(shoppingcart);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
} catch (err) {
    console.log("🚀 ~ file: shoppingCart.controller.js ~ line 24 ~ exports.getallshoppingcartdetail=async ~ err", req.body)
    if (
      err.ValidationError ||
      err.SyntaxError ||
      err.ForeignKeyConstraintError
    ) {
      req.body = {
        errorKey: ErrorKey.BAD_REQUEST,
      };
      return next();
    }
    req.body = {
      errorKey: ErrorKey.PARTIAL_CONTENT,
    };
    return next();
  }

};

exports.postShoppingcart = async(req,res,next) => {
    const response = new ResponseModel();
    const {
      shopping_cart_id,
      product_id,
      user_id
    } = req.body;
    try {
        const postshopingcart = await sequelize.query(
            `
            INSERT INTO e_store_cart.shopping_cart
            (
              shopping_cart_id,
              product_id,
              user_id 
            )
            values(
                '${shopping_cart_id}',
                '${product_id}',
                '${user_id}'
           )     
            `, {
                type: QueryTypes.INSERT
            });
            response.setData(postshopingcart);
            response.setStatus(ReasonPhrases.CREATED);
            return res.status(StatusCodes.CREATED).send(postshopingcart);
    } catch (err) {
        console.log("🚀 ~ file: shoppingCart.controller.js ~ line 71 ~ exports.postShoppingcart=async ~ err", req.body)
        if (
          err.ValidationError ||
          err.SyntaxError ||
          err.ForeignKeyConstraintError
        ) {
          req.body = {
            errorKey: ErrorKey.BAD_REQUEST,
          };
          return next();
        }
        req.body = {
          errorKey: ErrorKey.PARTIAL_CONTENT,
        };
        return next();
      }
};

exports.updateShoppingCart = async(req,res,next) => {
    const response = new ResponseModel();
    const {
      shopping_cart_id,
      product_id,
      user_id
    } = req.body;
    try {
        const updateshoppingcart = await sequelize.query(
            `
           UPDATE e_store_cart.shopping_cart
            SET            
            shopping_cart_id ='${shopping_cart_id}',
                product_id ='${product_id}',
                user_id = '${user_id}'        
     
            `, {
                type: QueryTypes.UPDATE
            });
            response.setData(updateshoppingcart);
            response.setStatus(ReasonPhrases.OK);
            return res.status(StatusCodes.OK).send(updateshoppingcart);
    } catch (err) {
        console.log("🚀 ~ file: shoppingCart.controller.js ~ line 112 ~ exports.updateShoppingCart=async ~ err", req.body)
        if (
          err.ValidationError ||
          err.SyntaxError ||
          err.ForeignKeyConstraintError
        ) {
          req.body = {
            errorKey: ErrorKey.BAD_REQUEST,
          };
          return next();
        }
        req.body = {
          errorKey: ErrorKey.PARTIAL_CONTENT,
        };
        return next();
      }
};

exports.deleteShoppingCart = async(req,res, next)=> {
    const response = new ResponseModel();
try {
    const delshoppingcart =  await sequelize.query(`
    DELETE FROM e_store_cart.shopping_cart
    WHERE shopping_cart_id = ${req.body.shopping_cart_id}
    
    `,{ 
        type: QueryTypes.DELETE
    });
    console.info('shopping cart  deleted successfully');
    response.setData('deleted successfully' );
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(delshoppingcart);
} catch (err) {
console.log("🚀 ~ file: product.controller.js ~ line 166 ~ exports.deleteproduct ~ err", err)
if (
  err.ValidationError ||
  err.SyntaxError ||
  err.ForeignKeyConstraintError
) {
  req.body = {
    errorKey: ErrorKey.BAD_REQUEST,
  };
  return next();
}
req.body = {
  errorKey: ErrorKey.PARTIAL_CONTENT,
};
return next();
}
};
