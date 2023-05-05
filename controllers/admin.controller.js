const authServices = require("../services/admin.services");
const logger = require("../utils/logger.utils");
const { httpAuthorizedResponse, httpUnauthorizedResponse, httpServerErrorResponse } = require("../utils/response.utils");

/**
 * Validates the admin, and if admin exists, returns a token to access the application
 * @param {*} req
 * @param {*} res
 */
const loginAdmin = async (req, res) => {
    logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
    let response;

    const serviceResponse = await authServices.loginAdminService(req.body);

    if (serviceResponse.status) {
        //if login admin service worked without any error
        if (serviceResponse.token) {
            response = httpAuthorizedResponse({
                adminName: serviceResponse.adminName,
                token: serviceResponse.token,
                accessLevel: serviceResponse.accessLevel,
            });
            logger.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
        } else {
            response = httpUnauthorizedResponse(serviceResponse.data);
            logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
        }
    } else {
        //if login admin service had any error
        response = httpServerErrorResponse(serviceResponse.data);
        logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    }
    res.status(response.code).json(response);
    logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
};

module.exports = { loginAdmin };
