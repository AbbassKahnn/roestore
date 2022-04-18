const express = require('express');
const Controller = require('../controllers/product.controller');
const auth = require('../middleware/auth');
const ErrorHandler = require('../middleware/errorhandler');

const Router = express.Router();

/**
  * @swagger
  * /product:
  *  get:
  *      tags:
  *          - PRODUCT
  *      name: product
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get all products.
  *      responses:
  *          200:
  *              description: Received products.
  */
Router.get('/', [auth, Controller.getAllProduct, ErrorHandler]);


/**
  * @swagger
  * /product/{product_id}:
  *  get:
  *      tags:
  *          - PRODUCT
  *      name: product
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get single product with all data.
  *      parameters:
  *          - name: product_id
  *            in: path
  *            type: integer
  *            require: true
  *      responses:
  *          200:
  *              description: Received products.
  */
 Router.get('/:product_id', [auth, Controller.getSingleProduct, ErrorHandler]);

/**
  * @swagger
  * /product:
  *  post:
  *      tags:
  *          - PRODUCT
  *      name: product
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
  *                     product_id:
  *                        type: integer
  *                     name:
  *                        type: string
  *                     title:
  *                        type: string
  *                     discription:
  *                        type: string
  *                     price:
  *                        type: string
  *                     quantity:
  *                        type: string
  *                     color:
  *                        type: string
  *                     product_catagories_id:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: New product added.
  */
 Router.post('/', [Controller.postproduct, ErrorHandler]);

  /**
  * @swagger
  * /product:
  *  put:
  *      tags:
  *          - PRODUCT
  *      name: product
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
  *                     product_id:
  *                        type: integer
  *                     name:
  *                        type: string
  *                     title:
  *                        type: string
  *                     discription:
  *                        type: string
  *                     price:
  *                        type: string
  *                     quantity:
  *                        type: string
  *                     color:
  *                        type: string
  *      responses:
  *          '200':
  *              description: product updated.
  */
   Router.put('/', [Controller.updateProduct, ErrorHandler]);

     /**
  * @swagger
  * /product:
  *  delete:
  *      tags:
  *          - PRODUCT
  *      name: product
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should delete the product.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     product_id:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: product deleted.
  */
      Router.delete('/', [Controller.deleteproduct, ErrorHandler]);

module.exports = Router;