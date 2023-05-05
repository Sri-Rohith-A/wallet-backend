const logger = require("../utils/logger.utils");
const configServices = require("../services/config.services");

/**
 * Controller for getting details of configs from database
 * @param {*} req
 * @param {*} res
 */
const getConfigs = async (req, res) => {
    logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
    const response = await configServices.getConfigs(req);

    res.status(response.code).json(response);
    logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
};

/**
 * Controller for updating configs to database
 * @param {*} req
 * @param {*} res
 */
const modifyConfigs = async (req, res) => {
    logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
    const response = await configServices.modifyConfigs(req);

    res.status(response.code).json(response);
    logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
};

module.exports = {
    getConfigs,
    modifyConfigs,
};
