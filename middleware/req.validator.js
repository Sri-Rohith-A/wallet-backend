const logger = require("../utils/logger.utils");
const { httpInvalidInputResponse } = require("../utils/response.utils");
const statusResponse = require("../constants/constants");

/**
 * Validator for valid json format in request
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const validateRequestBody = (error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === statusResponse.STATUS_CODES.BAD_REQUEST && error.body) {
        response = httpInvalidInputResponse(error.message);
        logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
        res.status(response.code).send(response);
        return;
    } else next();
};

module.exports = { validateRequestBody };
