const { StatusCodes } = require('http-status-codes');
const { ReasonPhrases } = require('http-status-codes');
const { QueryTypes } = require('sequelize');
const ErrorKey = require('../constants/errorKeys');
const ResponseModel = require('../constants/response.constant');
const sequelize = require('../sequelize');

exports.getAllUsers = async (req, res, next) => {
	const response = new ResponseModel();
	try {
		const users =  await sequelize.query(`
		select * from users
		`, {
			type: QueryTypes.SELECT
		});
		console.info('All records fetched from db');
		response.setData(users);
		response.setStatus(ReasonPhrases.OK);
		return res.status(StatusCodes.OK).send(response);
	} catch (err) {
		console.error(`Get all user error! ${err}`);
		if (err.ValidationError || err.SyntaxError || err.ForeignKeyConstraintError) {
			req.body = {
				errorKey: ErrorKey.BAD_REQUEST
			};
			return next();
		}
		req.body = {
			errorKey: ErrorKey.PARTIAL_CONTENT,
		};
		return next();
	}
};
