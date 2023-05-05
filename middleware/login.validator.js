const logger = require("../utils/logger.utils");
const { httpInvalidInputResponse } = require("../utils/response.utils");
const joiValidation = require("../utils/joi.utils");

/**
 * This function validates the admin data
 *
 * @param {*} req
 * @param {*} res
 */
const validateAdmin = (req, res, next) => {
    const adminData = req.body;
    const validationResult = joiValidation(adminData,"adminSchema");
    if (validationResult.error) {
        validationResult.error.details = validationResult.error.details.map((e) => e.message);
        response = httpInvalidInputResponse(validationResult.error.details);

        logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
        res.status(response.code).send(response);
        return;
    }
    next();
};

module.exports = { validateAdmin };
