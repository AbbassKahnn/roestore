const express = require('express');
const Controller = require('../controllers/shoppingCart.controller');
const ErrorHandler = require('../middleware/errorhandler');

const Router = express.Router();

/**
  * @swagger
  * /shopping_cart:
  *  get:
  *      tags:
  *          - SHOPPING_CART
  *      name: shopping_cart
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get all shopping cart details.
  *      responses:
  *          200:
  *              description: Received shopping cart details.
  */
Router.get('/', [Controller.getAllShoppingCartDetail, ErrorHandler]);

/**
  * @swagger
  * /shopping_cart:
  *  post:
  *      tags:
  *          - SHOPPING_CART
  *      name: shopping_cart
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should add new products in shopping cart.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     product_id:
  *                        type: integer
  *                     user_id:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: New product added.
  */
 Router.post('/', [Controller.postShoppingCart, ErrorHandler]);

  /**
  * @swagger
  * /shopping_cart:
  *  put:
  *      tags:
  *          - SHOPPING_CART
  *      name: shopping_cart
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
  *                     shopping_cart_id:
  *                        type: integer
  *                     product_id:
  *                        type: integer
  *                     user_id:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: shopping cart  updated.
  */
   Router.put('/', [Controller.updateShoppingCart, ErrorHandler]);

     /**
  * @swagger
  * /shopping_cart:
  *  delete:
  *      tags:
  *          - SHOPPING_CART
  *      name: shopping_cart
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
  *                     shopping_cart_id:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: product deleted.
  */
      Router.delete('/', [Controller.deleteShoppingCart, ErrorHandler]);

module.exports = Router;