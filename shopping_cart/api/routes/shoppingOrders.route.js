const express = require('express');
const Controller = require('../controllers/shoppingOrders.controller');
const ErrorHandler = require('../middleware/errorhandler');

const Router = express.Router();

/**
  * @swagger
  * /shopping_orders:
  *  get:
  *      tags:
  *          - SHOPPING_ORDERS
  *      name: shopping_orders
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get all shopping cart details.
  *      responses:
  *          200:
  *              description: Received shopping cart details.
  */
Router.get('/', [Controller.getAllShoppingOrders, ErrorHandler]);


/**
  * @swagger
  * /shopping_orders/{user_id}:
  *  get:
  *      tags:
  *          - SHOPPING_ORDERS
  *      name: shopping_orders
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get all shopping cart details.
  *      parameters:
  *          - name: user_id
  *            in: path
  *            type: integer
  *            require: true
  *      responses:
  *          200:
  *              description: Received shopping cart details.
  */
 Router.get('/:user_id', [Controller.getAllOrdersByUserId, ErrorHandler]);


/**
  * @swagger
  * /shopping_orders:
  *  post:
  *      tags:
  *          - SHOPPING_ORDERS
  *      name: shopping_orders
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should add new orders in shopping cart.
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
  *                     quantity:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: New orders are added.
  */
 Router.post('/', [Controller.postShoppingOrders, ErrorHandler]);

  /**
  * @swagger
  * /shopping_orders:
  *  put:
  *      tags:
  *          - SHOPPING_ORDERS
  *      name: shopping_orders
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
  *                     user_id:
  *                        type: integer
  *                     shopping_status:
  *                        type: integer
  *                     quantity:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: shopping orders  updated.
  */
   Router.put('/', [Controller.updateShoppingOrders, ErrorHandler]);

     /**
  * @swagger
  * /shopping_orders:
  *  delete:
  *      tags:
  *          - SHOPPING_ORDERS
  *      name: shopping_orders
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should delete the product.
  *      responses:
  *          '200':
  *              description: product deleted.
  */
      Router.delete('/', [Controller.deleteShoppingOrders, ErrorHandler]);

module.exports = Router;