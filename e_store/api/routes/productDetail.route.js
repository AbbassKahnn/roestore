const express = require('express');
const Controller = require('../controllers/productDetail.controller');
const auth = require('../middleware/auth');
const ErrorHandler = require('../middleware/errorhandler');

const Router = express.Router();

/**
  * @swagger
  * /product_detail:
  *  get:
  *      tags:
  *          - PRODUCT_DETAIL
  *      name: product_detail
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get all products detail.
  *      responses:
  *          200:
  *              description: Received product detail.
  */
Router.get('/', [auth, Controller.getallproductDetail, ErrorHandler]);

/**
  * @swagger
  * /product_detail:
  *  post:
  *      tags:
  *          - PRODUCT_DETAIL
  *      name: product_detail
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should add new product detail.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     product_id:
  *                        type: integer
  *                     product_style:
  *                        type: string
  *                     material:
  *                        type: string
  *                     brand_name:
  *                        type: string
  *                     place_of_origin:
  *                        type: string
  *                     model_number:
  *                        type: string
  *                     supple_ability:
  *                        type: string
  *      responses:
  *          '200':
  *              description: New product added.
  */
 Router.post('/', [Controller.postproductDetail, ErrorHandler]);

  /**
  * @swagger
  * /product_detail:
  *  put:
  *      tags:
  *          - PRODUCT_DETAIL
  *      name: product_detail
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should update the product's detail.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     product_id:
  *                        type: integer
  *                     product_style:
  *                        type: string
  *                     material:
  *                        type: string
  *                     brand_name:
  *                        type: string
  *                     place_of_origin:
  *                        type: string
  *                     model_number:
  *                        type: string
  *                     supple_ability:
  *                        type: string
  *      responses:
  *          '200':
  *              description: product detail updated.
  */
   Router.put('/', [Controller.updateProductDetail, ErrorHandler]);

     /**
  * @swagger
  * /product_detail:
  *  delete:
  *      tags:
  *          - PRODUCT_DETAIL
  *      name: product_detail
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
  *                     product_detail_id:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: product deleted.
  */
      Router.delete('/', [Controller.deleteproductDetail, ErrorHandler]);

module.exports = Router;