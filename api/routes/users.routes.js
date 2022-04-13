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


module.exports = Router;
