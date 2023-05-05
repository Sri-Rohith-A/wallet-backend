const logger = require("../utils/logger.utils");
const { httpInvalidInputResponse } = require("../utils/response.utils");
const joiValidation = require("../utils/joi.utils");

/**
 * Method to validate config data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns validationResult
 */
const validateConfig = (req, res, next) => {
    const configData = req.body;
    const validationResult = joiValidation(configData,"configSchema");

    if (validationResult.error) {
        validationResult.error.details = validationResult.error.details.map((e) => e.message);
        response = httpInvalidInputResponse(validationResult.error.details);

        logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
        res.status(response.code).send(response);
        return;
    }
    next();
};

module.exports = {
    validateConfig,
};
