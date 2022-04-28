const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");
const Axios = require('axios');

exports.getAllShoppingOrders = async(req,res,next) => {
    const response = new ResponseModel();
    try {
    const ShoppingOrder = await sequelize.query(`
    SELECT *
    FROM shopping_orders
    `,{
        type: QueryTypes.SELECT
    });
    const product_ids = [];
    const user_ids= [];
  ShoppingOrder.map(ele =>{
    product_ids.push(ele.product_id);
    user_ids.push(ele.user_id);
  });

  const user = await Axios.get(`http://localhost:5000/users/${user_ids}`);
  const shoppingOderArr = [];
  const product = await Axios.get(`http://localhost:5001/product/service/${product_ids}`);

  for(let i= 0; i < product_ids.length; i++){
    for(let j=0; j < product.data.data.length; j++){
      if(product_ids[i] === product.data.data[j].product_id){
        product.data.data[j].shopping_orders_id = ShoppingOrder[i].shopping_orders_id;
        product.data.data[j].shopping_status= ShoppingOrder[i].shopping_status
        product.data.data[j].orderQuantity = ShoppingOrder[i].quantity
        product.data.data[j].user_id = ShoppingOrder[i].user_id
        shoppingOderArr.push(product.data.data[j])
      }
    }
  }

  for(let i=0; i<shoppingOderArr.length; i++){
    for(let j=0; j<user.data.data.length; j++){
      if(shoppingOderArr[i].user_id === user.data.data[j].user_id){
        delete user.data.data[j].password;
        shoppingOderArr[i].user = user.data.data[j]
      }
    }
  }
    console.info('all records are fetched from database');
    response.setData(shoppingOderArr);
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

exports.getAllOrdersByUserId = async(req,res,next) => {
  const response = new ResponseModel();
  try {
  const ShoppingOrder = await sequelize.query(`
  SELECT *
  FROM shopping_orders
  where user_id = '${req.params.user_id}'
  `,{
      type: QueryTypes.SELECT
  });
  const product_ids = []
  ShoppingOrder.map(ele =>{
    product_ids.push(ele.product_id);
  });

  const shoppingOderArr = [];
  const product = await Axios.get(`http://localhost:5001/product/service/${product_ids}`);
  for(let i= 0; i<product_ids.length; i++){
    for(let j=0; j<product.data.data.length; j++){
      if(product_ids[i] === product.data.data[j].product_id){
        product.data.data[j].shopping_cart_id = ShoppingOrder[i].shopping_order_id;
        product.data.data[j].shopping_status = ShoppingOrder[i].shopping_status;
        shoppingOderArr.push(product.data.data[j])
      }
    }
  }
  console.info('all records are fetched from database');
  response.setData(shoppingOderArr);
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
      select * from e_commerce_orders.shopping_orders 
      where product_id= '${product_id}' and user_id = '${user_id}'
      `,{
        type: QueryTypes.SELECT
    }) ;

      let order;
      if(checkOrder.length > 0){
        order= await sequelize.query(
          `
         UPDATE e_commerce_orders.shopping_orders
          SET            
            quantity = '${quantity}' 
          WHERE  product_id ='${product_id}' and  user_id = '${user_id}'  
          `, {
              type: QueryTypes.UPDATE
          });
          
      } else {
         order = await sequelize.query(
          `
          INSERT INTO e_commerce_orders.shopping_orders
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
          DELETE FROM e_commerce_orders.shopping_cart
          WHERE product_id = ${product_id} and user_id = ${user_id}
          
          `,{ 
              type: QueryTypes.DELETE
          });

        await Axios.patch(`http://localhost:5001/product/${product_id}`, {quantity: quantity} )
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
      shopping_orders_id,
        shopping_status,
        quantity
    } = req.body;
    try {
        const updateshoppingorder = await sequelize.query(
            `
           UPDATE e_commerce_orders.shopping_orders
            SET            
              shopping_status = '${shopping_status}',
              quantity = '${quantity}' 
            WHERE  shopping_orders_id ='${shopping_orders_id}'  
     
     
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
