const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken");

exports.getAllShoppingCartDetail = async(req,res,next) => {
    const response = new ResponseModel();
    try {
    const ShoppingCart = await sequelize.query(`
    SELECT *
    FROM shopping_cart
    `,{
        type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(ShoppingCart);
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

exports.postShoppingCart = async(req,res,next) => {
    const response = new ResponseModel();
    const {
      product_id,
      user_id,
      quantity
    } = req.body;
    try {
        const postShoping_Cart = await sequelize.query(
            `
            INSERT INTO e_store_cart.shopping_cart
            (
              product_id,
              user_id,
              quantity 
            )
            values(
                '${product_id}',
                '${user_id}',
                '${quantity}'
           )     
            `, {
                type: QueryTypes.INSERT
            });
            response.setData(postShoping_Cart);
            response.setStatus(ReasonPhrases.CREATED);
            return res.status(StatusCodes.CREATED).send(response);
    } catch (err) {
        console.log("🚀 ~ file: shoppingCart.controller.js ~ line 71 ~ exports.postShoppingcart=async ~ err", err)
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
      user_id,
      product_id,
      quantity
  } = req.body;
  try {
      const updateshopping_cart = await sequelize.query(
          `
         UPDATE e_store_cart.shopping_cart
          SET 
          product_id = '${product_id}',           
          user_id = '${user_id}',
          quantity = '${quantity}'  
          WHERE  shopping_cart_id ='${shopping_cart_id}'
   
          `, {
              type: QueryTypes.UPDATE
          });
          response.setData(updateshopping_cart);
          response.setStatus(ReasonPhrases.OK);
          return res.status(StatusCodes.OK).send(response);
    } catch (err) {
        console.log("🚀 ~ file: shoppingCart.controller.js ~ line 109 ~ exports.updateShoppingCart=async ~ err", err)
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
    return res.status(StatusCodes.OK).send(response);
} catch (err) {
console.log("🚀 ~ file: shoppingCart.controller.js ~ line 144 ~ exports.deleteShoppingCart ~ err", req.body)
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
