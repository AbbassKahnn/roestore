const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");

exports.getAllProduct = async (req, res, next) => {
  const response = new ResponseModel();
  try {
    const product = await sequelize.query(`
    SELECT p.*
    FROM product p
    `, {
      type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(product);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
  } catch (err) {
    console.error(`Get all user error! ${err}`);
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


exports.getSingleProduct = async (req, res, next) => {
  const response = new ResponseModel();
  try {
    const { product_id } = req.params;
    const product = await sequelize.query(`
  SELECT *
  FROM product p 
  left join product_images pi on pi.product_id = p.product_id
  left join product_detail pd on pd.product_id = p.product_id
  where p.product_id = ${product_id}
  `, {
      type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(product);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
  } catch (err) {
    console.error(`Get all user error! ${err}`);
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


exports.getAllProductByCatagory = async (req, res, next) => {
  const response = new ResponseModel();
  try {
    const { product_catagories_id } = req.params;
    const products = await sequelize.query(`
  SELECT p.*, pi.product_image_id, pi.image_title, pi.image
  FROM product p
   left join product_images pi on pi.product_id = p.product_id
  where p.product_catagories_id = ${product_catagories_id}
  `, {
      type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(products);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
  } catch (err) {
    console.error(`Get all user error! ${err}`);
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

exports.postProduct = async (req, res, next) => {
  const response = new ResponseModel();
  const {
    name,
    title,
    description,
    price,
    quantity,
    color,
    product_catagories_id,
    image,

  } = req.body;
  console.log("🚀 ~ file: product.controller.js ~ line 130 ~ exports.postProduct= ~ req.body", req.body)
  try {
    const postProduct = await sequelize.query(
      `
      insert into  e_commerce_store.product (name, title , description, price, quantity, color, product_catagories_id, image)
            values(
                '${name}',
                '${title}',
                '${description}',
                '${price}',
                '${quantity}',
                '${color}',
                '${product_catagories_id}',
                '${image}'
           )     
            `, {
      type: QueryTypes.INSERT
    });
    response.setData(postProduct);
    response.setStatus(ReasonPhrases.CREATED);
    return res.status(StatusCodes.CREATED).send(response);
  } catch (err) {
    console.log("🚀 ~ file: product.controller.js ~ line 84 ~ exports.postproduct=async ~ err", err)
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

exports.updateProduct = async (req, res, next) => {
  const response = new ResponseModel();
  const {
    product_id,
    name,
    title,
    description,
    price,
    quantity,
    color,
    image
  } = req.body;
  try {
    const updateProduct = await sequelize.query(
      `
           UPDATE e_commerce_store.product
            SET            
                name ='${name}',
                title = '${title}',
                description = '${description}',
                price  =  '${price}',
                quantity =  '${quantity}',
                color = '${color}' ,
                image= '${image}'
              where  product_id ='${product_id}'
     
            `, {
      type: QueryTypes.UPDATE
    });
    response.setData(updateProduct);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
  } catch (err) {
    console.log("🚀 ~ file: product.controller.js ~ line 134 ~ exports.postproduct=async ~ err", err)
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

exports.deleteProduct = async (req, res, next) => {
  const response = new ResponseModel();
  try {
    const delPoduct = await sequelize.query(`
    DELETE FROM e_commerce_store.product
    WHERE product_id = ${req.body.product_id}
    
    `, {
      type: QueryTypes.DELETE
    });
    console.info('product deleted successfully');
    response.setData('deleted successfully');
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
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
