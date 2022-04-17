const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getallproductImages = async(req,res,next) => {
    const response = new ResponseModel();
    try {
    const productimages = await sequelize.query(`
    SELECT *
    FROM product_images
    `,{
        type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(productimages);
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

exports.postproductImages = async(req,res,next) => {
    const response = new ResponseModel();
    const {
        product_id,
        image_title,
        image,
        discription

    } = req.body;
    try {
        const postproImages = await sequelize.query(
            `
            INSERT INTO e_commerce_store.product_images
            (
                product_id,
                image_title,
                image,
                discription
            )
            values(
                '${product_id}',
                '${image_title}',
                '${image}',
                '${discription}'

           )     
            `, {
                type: QueryTypes.INSERT
            });
            response.setData(postproImages);
            response.setStatus(ReasonPhrases.CREATED);
            return res.status(StatusCodes.CREATED).send(postproImages);
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
      discription

    } = req.body;
    try {
        const updateproimages = await sequelize.query(
            `
           UPDATE e_commerce_store.product_images
            SET 
            product_id ='${product_id}',
            image_title ='${image_title}',
            image = '${image}',
            discription = '${discription}'  
     
            `, {
                type: QueryTypes.UPDATE
            });
            response.setData(updateproimages);
            response.setStatus(ReasonPhrases.OK);
            return res.status(StatusCodes.OK).send(updateproimages);
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

exports.deleteproductImage = async(req,res, next)=> {
    const response = new ResponseModel();
try {
    const delproImages =  await sequelize.query(`
    DELETE FROM e_commerce_store.product_images
    WHERE product_id = ${req.body.product_id}
    
    `,{ 
        type: QueryTypes.DELETE
    });
    console.info('product deleted images successfully');
    response.setData('deleted successfully' );
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(delproImages);
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
