const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken");

exports.getAllProductImages = async(req,res,next) => {
    const response = new ResponseModel();
    try {
    const productImages = await sequelize.query(`
    SELECT *
    FROM product_images
    `,{
        type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(productImages);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
} catch (err) {
    console.log("🚀 ~ file: productImages.controller.js ~ line 24 ~ exports.getallproductImages=async ~ err", req.body)
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

exports.postProductImages = async(req,res,next) => {
    const response = new ResponseModel();
    const {
        product_id,
        image_title,
        image,
        description

    } = req.body;
    try {
        const postProImages = await sequelize.query(
            `
            INSERT INTO e_commerce_store.product_images
            (
                product_id,
                image_title,
                image,
                description
            )
            values(
                '${product_id}',
                '${image_title}',
                '${image}',
                '${description}'

           )     
            `, {
                type: QueryTypes.INSERT
            });
            response.setData(postProImages);
            response.setStatus(ReasonPhrases.CREATED);
            return res.status(StatusCodes.CREATED).send(response);
    } catch (err) {
        console.log("🚀 ~ file: productImages.controller.js ~ line 76 ~ exports.postproductImages=async ~ err", req.body)
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

exports.updateProductImage = async(req,res,next) => {
    const response = new ResponseModel();
    const {
      product_id,
      image_title,
      image,
      description

    } = req.body;
    try {
        const updatePoImages = await sequelize.query(
            `
           UPDATE e_commerce_store.product_images
            SET 
            product_id ='${product_id}',
            image_title ='${image_title}',
            image = '${image}',
            description = '${description}'  
     
            `, {
                type: QueryTypes.UPDATE
            });
            response.setData(updatePoImages);
            response.setStatus(ReasonPhrases.OK);
            return res.status(StatusCodes.OK).send(response);
    } catch (err) {
        console.log("🚀 ~ file: productImages.controller.js ~ line 120 ~ exports.updateProductImage=async ~ err", err)
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

exports.deleteProductImage = async(req,res, next)=> {
    const response = new ResponseModel();
try {
    const delProImages =  await sequelize.query(`
    DELETE FROM e_commerce_store.product_images
    WHERE product_id = ${req.body.product_id}
    
    `,{ 
        type: QueryTypes.DELETE
    });
    console.info('product deleted images successfully');
    response.setData('deleted successfully' );
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
} catch (err) {
console.log("🚀 ~ file: productImages.controller.js ~ line 153 ~ exports.deleteproductImage ~ err", err)
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
