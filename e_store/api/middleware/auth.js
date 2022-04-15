const { StatusCodes } = require('http-status-codes');
const { ReasonPhrases } = require('http-status-codes');
const jsonwebtoken = require('jsonwebtoken');
const ResponseModel = require('../constants/response.constant');

/**
 * 
 * @param {*} authorizationHeader 
 * @returns It returns nil if the token is not present and 
 */
 function getAndValidateAuthorizationHeader(authorizationHeader) {
	try {
		const headerSplit = authorizationHeader.split(' ');
		if (headerSplit[0] === 'Bearer' && headerSplit.length == 2) {
			return headerSplit[1];
		}
	} catch (error) {
		return false;
	}
}

module.exports = async (req, res, next) => {

	const response = new ResponseModel();
	try {
		const token = getAndValidateAuthorizationHeader(req.headers.authorization);	
        const decoded = jsonwebtoken.decode(token, process.env.SECRET);
        console.log("🚀 ~ file: auth.js ~ line 23 ~ module.exports= ~ decoded", decoded)
        if(decoded){
        req.user = decoded;
        return next();
    }else{
        response.setStatus(ReasonPhrases.UNAUTHORIZED);
		response.setData('Token expired, authorization denied');
		return res.status(StatusCodes.UNAUTHORIZED).send(response);
		
    }

	} catch (err) {
		response.setStatus(ReasonPhrases.UNAUTHORIZED);
		response.setData('Token expired, authorization denied');
		return res.status(StatusCodes.UNAUTHORIZED).send(response);
		
	}
};
