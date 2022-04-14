/* eslint-disable indent */
const { StatusCodes } = require('http-status-codes');
const { ReasonPhrases } = require('http-status-codes');
const ErrorKey = require('../constants/errorKeys');
const ResponseModel = require('../constants/response.constant');

module.exports = (req, res) => {
    const response = new ResponseModel();
    const { errorKey } = req.body;
    switch (errorKey) {
        case ErrorKey.NOT_FOUND: {
            response.setStatus(ReasonPhrases.NOT_FOUND);
            response.setError('Error! Record not found');
            return res.status(StatusCodes.NOT_FOUND).send(response);
        }
        case ErrorKey.PARTIAL_CONTENT: {
            response.setStatus(ReasonPhrases.PARTIAL_CONTENT);
            // response.setData("Record not found");
            response.setError('Error! Partial content');
            return res.status(StatusCodes.PARTIAL_CONTENT).send(response);
        }
        case ErrorKey.NO_CONTENT: {
            response.setStatus(ReasonPhrases.NO_CONTENT);
            response.setError('Error! Bad Request');
            return res.status(StatusCodes.NO_CONTENT).send(response);
        }
        case ErrorKey.UNAUTHORIZED: {
            response.setStatus(ReasonPhrases.UNAUTHORIZED);
            response.setError('Error! Authorization denied!');
            return res.status(StatusCodes.UNAUTHORIZED).send(response);
        }
        case ErrorKey.INTERNAL_SERVER_ERROR: {
            response.setStatus(ReasonPhrases.INTERNAL_SERVER_ERROR);
            response.setError('Error! Server Error!');
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response);
        }
        case ErrorKey.ALREADY_EXIST: {
            response.setStatus('Already exist!');
            response.setError('Error! Already exist!');
            return res.status(403).send(response);
        }
        default: {
            response.setStatus(ReasonPhrases.BAD_REQUEST);
            response.setError('Bad Request');
            return res.status(StatusCodes.BAD_REQUEST).send(response);
        }
    }
};
