const express = require('express');
const Controller = require('../controllers/users.controller');
const ErrorHandler = require('../middleware/errorhandler');

const Router = express.Router();

/**
  * @swagger
  * /users:
  *  get:
  *      tags:
  *          - USERS
  *      name: Users
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should get all users.
  *      responses:
  *          200:
  *              description: Received users.
  */
Router.get('/', [Controller.getAllUsers, ErrorHandler]);

/**
  * @swagger
  * /users:
  *  post:
  *      tags:
  *          - USERS
  *      name: Users
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should add new user.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     user_name:
  *                        type: string
  *                     first_name:
  *                        type: string
  *                     last_name:
  *                        type: string
  *                     email:
  *                        type: string
  *                        format: email
  *                     phone_number:
  *                        type: string
  *                     password:
  *                        type: string
  *      responses:
  *          '200':
  *              description: New Parent created.
  */
 Router.post('/', [Controller.creatUser, ErrorHandler]);


/**
  * @swagger
  * /users/login:
  *  post:
  *      tags:
  *          - USERS
  *      name: Users
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should login the user.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     user_name:
  *                        type: string
  *                     password:
  *                        type: string
  *      responses:
  *          '200':
  *              description: New Parent created.
  */
 Router.post('/login', [Controller.login, ErrorHandler]);

module.exports = Router;
