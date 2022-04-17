const express = require('express');
const Controller = require('../controllers/productImages.controller');
const auth = require('../middleware/auth');
const ErrorHandler = require('../middleware/errorhandler');

const Router = express.Router();

/**
  * @swagger
  * /product_images:
  *  get:
  *      tags:
  *          - PRODUCT_IMAGES
  *      name: product_images
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get all products images.
  *      responses:
  *          200:
  *              description: Received product images.
  */
Router.get('/', [auth, Controller.getallproductImages, ErrorHandler]);

/**
  * @swagger
  * /product_images:
  *  post:
  *      tags:
  *          - PRODUCT_IMAGES
  *      name: product_images
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
  *                     image_title:
  *                        type: string
  *                     image:
  *                        type: string
  *                     discription:
  *                        type: string
  *      responses:
  *          '200':
  *              description: New product images are added.
  */
 Router.post('/', [Controller.postproductImages, ErrorHandler]);

  /**
  * @swagger
  * /product_images:
  *  put:
  *      tags:
  *          - PRODUCT_IMAGES
  *      name: product_images
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
  *                     image_title:
  *                        type: string
  *                     image:
  *                        type: string
  *                     discription:
  *                        type: string
  *      responses:
  *          '200':
  *              description: product detail updated.
  */
   Router.put('/', [Controller.updateProductImage, ErrorHandler]);

     /**
  * @swagger
  * /product_images:
  *  delete:
  *      tags:
  *          - PRODUCT_IMAGES
  *      name: product_images
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
  *              description: product images deleted.
  */
      Router.delete('/', [Controller.deleteproductImage, ErrorHandler]);

module.exports = Router;