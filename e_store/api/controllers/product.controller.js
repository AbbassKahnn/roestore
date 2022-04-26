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
    SELECT p.*, pd.product_style,
    pd.material,
    pd.place_of_origin,
    pd.model_number,
    pd.supple_ability,
    pd.brand_name
    FROM product p
    left join product_detail pd on pd.product_id = p.product_id
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
  SELECT p.*, pd.product_detail_id, pd.product_style,pd.material,pd.brand_name,
  pd.place_of_origin,pd.model_number,pd.supple_ability,
  pc.name as cat_name, pc.image as cat_image, pc.description as cat_description
  FROM product p 
  join product_catagories pc on pc.product_catagories_id = p.product_catagories_id
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


exports.getProductsService = async (req, res, next) => {
  const response = new ResponseModel();
  try {
    // const product_ids = JSON.parse(req.params.product_ids);
    // console.log("🚀 ~ file: product.controller.js ~ line 86 ~ exports.getProductsService= ~ product_ids", product_ids)
    const product = await sequelize.query(`
  SELECT p.*, pd.product_detail_id, pd.product_style,pd.material,pd.brand_name,
  pd.place_of_origin,pd.model_number,pd.supple_ability,
  pc.name as cat_name, pc.image as cat_image, pc.description as cat_description
  FROM product p 
  join product_catagories pc on pc.product_catagories_id = p.product_catagories_id
  left join product_detail pd on pd.product_id = p.product_id
  where p.product_id IN (${req.params.product_ids})
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




exports.getSeachProducts = async (req, res, next) => {
  const response = new ResponseModel();
  try {
    // const product_ids = JSON.parse(req.params.product_ids);
    // console.log("🚀 ~ file: product.controller.js ~ line 86 ~ exports.getProductsService= ~ product_ids", product_ids)
    const product = await sequelize.query(`
  SELECT p.*, pd.product_detail_id, pd.product_style,pd.material,pd.brand_name,
  pd.place_of_origin,pd.model_number,pd.supple_ability,
  pc.name as cat_name, pc.image as cat_image, pc.description as cat_description
  FROM product p 
  join product_catagories pc on pc.product_catagories_id = p.product_catagories_id
  left join product_detail pd on pd.product_id = p.product_id
  where p.name like '%${req.params.slug}%' OR p.title like  '%${req.params.slug}%'
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
  SELECT p.*
  FROM product p
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

    product_style,
        material,
        place_of_origin,
        model_number,
        supple_ability,
        brand_name
  } = req.body;
        console.log("🚀 ~ file: product.controller.js ~ line 220 ~ exports.postProduct= ~ supple_ability", supple_ability)
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

    const newProduct = await sequelize.query(`
    select * from  e_commerce_store.product where name='${name}' and title='${title}'
    `, {
      type: QueryTypes.SELECT
    });

    const detail= await sequelize.query(
      `
      INSERT INTO e_commerce_store.product_detail 
      (product_id, product_style, material, brand_name, place_of_origin, model_number, supple_ability) 
      VALUES('${newProduct[0].product_id}', '${product_style}','${material}', '${brand_name}',
       '${place_of_origin}', '${model_number}', '${supple_ability}');
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
    image,
    product_catagories_id,
    
    product_style,
        material,
        place_of_origin,
        model_number,
        supple_ability,
        brand_name
  } = req.body;
  console.log("🚀 ~ file: product.controller.js ~ line 180 ~ exports.updateProduct= ~ product_catagories_id", product_catagories_id)

  try {
    const updateProduct = await sequelize.query(
      `
           UPDATE e_commerce_store.product_detail
            SET 
          product_style='${product_style}',
        material='${material}',
        place_of_origin='${place_of_origin}',
        model_number='${model_number}',
        supple_ability='${supple_ability}',
        brand_name ='${brand_name}'          
                
              where  product_id ='${product_id}'
     
            `, {
      type: QueryTypes.UPDATE
    });

    const updateProductDetails = await sequelize.query(
      `
           UPDATE e_commerce_store.product
            SET            
                name='${name}',
                title='${title}',
                description='${description}',
                price='${price}',
                quantity='${quantity}',
                color='${color}' ,
                image='${image}',
                product_catagories_id='${parseInt(product_catagories_id)}'
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
    WHERE product_id = ${req.params.product_id}
    
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
