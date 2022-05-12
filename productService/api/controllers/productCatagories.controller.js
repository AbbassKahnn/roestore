const { StatusCodes } = require("http-status-codes");
const { ReasonPhrases } = require("http-status-codes");
const { QueryTypes } = require("sequelize");
const ErrorKey = require("../constants/errorKeys");
const ResponseModel = require("../constants/response.constant");
const sequelize = require("../sequelize");

/**
 * Get all catagories from database. 
 * @returns all catagories.
 */
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

/**
 * Get single catagory from database by catagory id (catagory id received from req params)
 * @returns single catagory.
 */
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

/**
 * This fucntion create new catagory in the database catagory table and 
 * catagory information received from req body.
 * @returns created 
 */
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
            INSERT INTO  product_catagories
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

/**
 * This fucntion update catagory in the database catagory table and 
 * catagory information received from req body.
 * @returns created 
 */
exports.updateProductCatagory = async(req,res,next) => {
    const response = new ResponseModel();
    const {
      product_catagories_id,
      name,
      image,
      description,
    } = req.body;
      console.log("🚀 ~ file: productCatagories.controller.js ~ line 128 ~ exports.updateProductCatagory=async ~ product_catagories_id", product_catagories_id)
    try {
        const updateproduct = await sequelize.query(
            `
           UPDATE  product_catagories
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


/**
 * This fuction delete the catagory from database (catagory table) by catagory id (catagory id in req params)
 * @returns deleted.
 */
exports.deleteProductCatagory = async(req,res, next)=> {
    const response = new ResponseModel();
try {
    const delproduct =  await sequelize.query(`
    DELETE FROM  product_catagories
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
