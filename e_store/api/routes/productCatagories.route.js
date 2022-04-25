const express = require('express');
const Controller = require('../controllers/productCatagories.controller');
const ErrorHandler = require('../middleware/errorhandler');

const Router = express.Router();

/**
  * @swagger
  * /product_catagory:
  *  get:
  *      tags:
  *          - PRODUCT CATAGORY
  *      name: Product catagory
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get all products.
  *      responses:
  *          200:
  *              description: Received products.
  */
Router.get('/', [ Controller.getAllCatagories, ErrorHandler]);


/**
  * @swagger
  * /product_catagory/{product_catagories_id}:
  *  get:
  *      tags:
  *          - PRODUCT CATAGORY
  *      name: Product catagory
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get single product with all data.
  *      parameters:
  *          - name: product_catagories_id
  *            in: path
  *            type: integer
  *            require: true
  *      responses:
  *          200:
  *              description: Received products.
  */
 Router.get('/:product_catagories_id', [ Controller.getSingleProductCatagory, ErrorHandler]);

/**
  * @swagger
  * /product_catagory:
  *  post:
  *      tags:
  *          - PRODUCT CATAGORY
  *      name: Product catagory
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should add new product.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     name:
  *                        type: string
  *                     image:
  *                        type: string
  *                     description:
  *                        type: string
  *      responses:
  *          '200':
  *              description: New product added.
  */
 Router.post('/', [Controller.createProductCatagory, ErrorHandler]);

  /**
  * @swagger
  * /product_catagory:
  *  put:
  *      tags:
  *          - PRODUCT CATAGORY
  *      name: Product catagory
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should update the product.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     product_catagories_id:
  *                        type: integer
  *                     name:
  *                        type: string
  *                     image:
  *                        type: string
  *                     description:
  *                        type: string
  *      responses:
  *          '200':
  *              description: product updated.
  */
   Router.put('/', [Controller.updateProductCatagory, ErrorHandler]);

     /**
  * @swagger
  * /product_catagory/{product_catagories_id}:
  *  delete:
  *      tags:
  *          - PRODUCT CATAGORY
  *      name: Product catagory
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should delete the product.
  *      parameters:
  *          - name: product_catagories_id
  *            in: path
  *            type: integer
  *            require: true
  *      responses:
  *          '200':
  *              description: product deleted.
  */
   Router.delete('/:product_catagories_id', [Controller.deleteProductCatagory, ErrorHandler]);

module.exports = Router;