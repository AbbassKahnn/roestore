'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
	basePath: '/',
	swaggerDefinition: {
		openapi: '3.0.3',
		// Like the one described here: https://swagger.io/specification/#infoObject
		info: {
			description: 'STUDENT SECURITY',
			swagger: '2.0',
			title: 'STUDENT SECURITY API',
			version: '1.0.0',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		},
		security: [{
			bearerAuth: []
		}]
	},
	// List of files to be processes. You can also set globs './routes/*.js'
	apis: ['./api/routes/*.js']
};
const specs = swaggerJsdoc(options);
exports.default = specs;
