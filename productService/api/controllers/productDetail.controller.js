const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken");

exports.getAllProductDetail = async(req,res,next) => {
    const response = new ResponseModel();
    try {
    const productDetail = await sequelize.query(`
    SELECT *
    FROM product_detail
    `,{
        type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(productDetail);
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
} catch (err) {
    console.log("🚀 ~ file: productDetail.controller.js ~ line 24 ~ exports.getallproductDetail=async ~ err", err)
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

exports.postProductDetail = async(req,res,next) => {
    console.log("🚀 ~ file: productDetail.controller.js ~ line 44 ~ exports.postproductDetail=async ~ req", req.body)
    const response = new ResponseModel();
    const {
        product_id,
        product_style,
        material,
        brand_name,
        place_of_origin,
       model_number,
       supple_ability
    } = req.body;
    try {
        const postProdetail = await sequelize.query(
            `
            INSERT INTO e_commerce_product.product_detail
            (
                product_id,
                product_style,
                material,
                brand_name,
                place_of_origin,
                model_number,
               supple_ability
            )
            values(
                '${product_id}',
                '${product_style}',
                '${material}',
                '${brand_name}',
                '${place_of_origin}',
                '${model_number}',
                '${supple_ability}'
           )     
            `, {
                type: QueryTypes.INSERT
            });
            response.setData(postProdetail);
            response.setStatus(ReasonPhrases.CREATED);
            return res.status(StatusCodes.CREATED).send(response);
    } catch (err) {
        console.log("🚀 ~ file: productDetail.controller.js ~ line 86 ~ exports.postproductDetail=async ~ err", err)
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

exports.updateProductDetail = async(req,res,next) => {
    const response = new ResponseModel();
    const {
        product_style,
        material,
        brand_name,
        place_of_origin,
       model_number,
       supple_ability

    } = req.body;
    try {
        const updateProeDtail = await sequelize.query(
            `
           UPDATE e_commerce_product.product_detail
            SET 
            product_style ='${product_style}',
            material ='${material}',
            brand_name = '${brand_name}',
            place_of_origin = '${place_of_origin}',
            model_number  =  '${model_number}',
            supple_ability =  '${supple_ability}' 
            WHERE product_id = '${req.body.product_id}'      
     
            `, {
                type: QueryTypes.UPDATE
            });
            response.setData(updateProeDtail);
            response.setStatus(ReasonPhrases.OK);
            return res.status(StatusCodes.OK).send(response);
    } catch (err) {
        console.log("🚀 ~ file: productDetail.controller.js ~ line 136 ~ exports.updateProductDetail=async ~ err", err)
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

exports.deleteProductDetail = async(req,res, next)=> {
    const response = new ResponseModel();
try {
    const delProDetail =  await sequelize.query(`
    DELETE FROM e_commerce_product.product_detail
    WHERE product_id = ${req.body.product_detail_id}
    
    `,{ 
        type: QueryTypes.DELETE
    });
    console.info('product deleted detail successfully');
    response.setData('deleted successfully' );
    response.setStatus(ReasonPhrases.OK);
    return res.status(StatusCodes.OK).send(response);
} catch (err) {
console.log("🚀 ~ file: productDetail.controller.js ~ line 167 ~ exports.deleteproduct ~ err", err)
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
