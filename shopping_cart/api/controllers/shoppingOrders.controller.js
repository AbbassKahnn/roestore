const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");

exports.getAllShoppingOrders = async(req,res,next) => {
    const response = new ResponseModel();
    try {
    const ShoppingOrder = await sequelize.query(`
    SELECT *
    FROM shopping_orders
    `,{
        type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(ShoppingOrder);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
} catch (err) {
    console.log("🚀 ~ file: shoppingOrders.controller.js ~ line 24 ~ exports.getallshoppingorders=async ~ err", req.body)
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

exports.postShoppingOrders = async(req,res,next) => {
    const response = new ResponseModel();
    const {
        product_id,
        user_id,
        quantity
    } = req.body;
    try {

      const checkOrder = await sequelize.query(`
      select * from e_store_cart.shopping_orders 
      where product_id= '${product_id}' and user_id = '${user_id}'
      `,{
        type: QueryTypes.SELECT
    }) ;

      let order;
      if(checkOrder.length > 0){
        order= await sequelize.query(
          `
         UPDATE e_store_cart.shopping_orders
          SET            
            quantity = '${quantity}' 
          WHERE  product_id ='${product_id}' and  user_id = '${user_id}'  
          `, {
              type: QueryTypes.UPDATE
          });
          
      } else {
         order = await sequelize.query(
          `
          INSERT INTO e_store_cart.shopping_orders
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
      }
      await sequelize.query(`
          DELETE FROM e_store_cart.shopping_cart
          WHERE product_id = ${product_id} and user_id = ${user_id}
          
          `,{ 
              type: QueryTypes.DELETE
          });

        
            response.setData(checkOrder);
            response.setStatus(ReasonPhrases.CREATED);
            return res.status(StatusCodes.CREATED).send(response);
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

exports.updateShoppingOrders = async(req,res,next) => {
    const response = new ResponseModel();
    const {
        product_id,
        user_id,
        shopping_status,
        quantity
    } = req.body;
    try {
        const updateshoppingorder = await sequelize.query(
            `
           UPDATE e_store_cart.shopping_orders
            SET            
              user_id = '${user_id}',   
              shopping_status = '${shopping_status}',
              quantity = '${quantity}' 
            WHERE  product_id ='${product_id}'  
     
     
            `, {
                type: QueryTypes.UPDATE
            });
            response.setData(updateshoppingorder);
            response.setStatus(ReasonPhrases.OK);
            return res.status(StatusCodes.OK).send(response);
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

exports.deleteShoppingOrders= async(req,res, next)=> {
    const response = new ResponseModel();
try {
    const delshoppingorders =  await sequelize.query(`
    DELETE FROM shopping_orders
    WHERE product_id = ${req.body.product_id}
    
    `,{ 
        type: QueryTypes.DELETE
    });
    console.info('shopping orders  deleted successfully');
    response.setData('deleted successfully' );
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
} catch (err) {
console.log("🚀 ~ file: product.controller.js ~ line 166 ~ exports.deleteproduct ~ err", req.body)
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
