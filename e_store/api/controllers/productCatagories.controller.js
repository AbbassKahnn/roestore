const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");

exports.getAllCatagories = async(req,res,next) => {
    const response = new ResponseModel();
    try {
    const productCatagories = await sequelize.query(`
    SELECT *
    FROM product_catagories p
    `,{
        type: QueryTypes.SELECT
    });
    console.info('all records are fetched from database');
    response.setData(productCatagories);
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

exports.getSingleProductCatagory = async(req,res,next) => {
  const response = new ResponseModel();
  try {
    const {product_catagories_id} = req.params;
  const productCatagory = await sequelize.query(`
  SELECT *
  FROM product_catagories p 
  where p.product_catagories_id = ${product_catagories_id}
  `,{
      type: QueryTypes.SELECT
  });
  console.info('all records are fetched from database');
  response.setData(productCatagory);
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

exports.createProductCatagory = async(req,res,next) => {
    const response = new ResponseModel();
    const {
        name,
        image,
        description,
    } = req.body;
    try {
        const create = await sequelize.query(
            `
            INSERT INTO e_commerce_store.product_catagories
            (
                name,
                image,
                description
            )
            values(
                '${name}',
                '${image}',
                '${description}'
           )     
            `, {
                type: QueryTypes.INSERT
            });
            response.setData(create);
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

exports.updateProductCatagory = async(req,res,next) => {
    const response = new ResponseModel();
    const {
      product_catagories_id,
      name,
      image,
      description,
    } = req.body;
    try {
        const updateproduct = await sequelize.query(
            `
           UPDATE e_commerce_store.product_catagories
            SET            
                name ='${name}',
                image = '${image}',
                description = '${description}'
              where product_catagories_id = ${product_catagories_id}
            `, {
                type: QueryTypes.UPDATE
            });
            response.setData(updateproduct);
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

exports.deleteProductCatagory = async(req,res, next)=> {
    const response = new ResponseModel();
try {
    const delproduct =  await sequelize.query(`
    DELETE FROM e_commerce_store.product_catagories
    WHERE product_catagories_id = ${req.params.product_catagories_id}
    
    `,{ 
        type: QueryTypes.DELETE
    });
    console.info('product deleted successfully');
    response.setData('deleted successfully' );
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
