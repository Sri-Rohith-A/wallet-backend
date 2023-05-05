const logger = require("../utils/logger.utils");
const cashServices = require("../services/cash.services");

/**
 * Controller for getting cash types from database
 * @param {*} req
 * @param {*} res
 */
const getCashTypes  = async(req,res) => {
    logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
    const response = await cashServices.getCashTypes(req);
    res.status(response.code).json(response);
    logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
}

/**
 * Controller for getting events list from database
 * @param {*} req
 * @param {*} res
 */
const getEvents = async(req,res) => {
    logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
    const response = await cashServices.getEvents(req);
    res.status(response.code).json(response);
    logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
}

/**
 * Controller for getting employee id and employee name from database
 * @param {*} req
 * @param {*} res
 */
const searchEmployee = async(req, res) => {
    logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
    const response = await cashServices.searchEmployee(req);
    res.status(response.code).json(response);
    logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
}

/**
 * Controller for getting default maternity cash for a selected female employee based on the location id from database
 * @param {*} req
 * @param {*} res
 */
const getDefaultMaternityCash = async(req, res) => {
    logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
    const response = await cashServices.getDefaultMaternityCash(req);
    res.status(response.code).json(response);
    logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
}

/**
 * Controller for getting default cdw cash for a selected employee based on the location id from database
 * @param {*} req
 * @param {*} res
 */
const getDefaultCdwCash = async(req, res) => {
    logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
    const response = await cashServices.getDefaultCDWCash(req);
    res.status(response.code).json(response);
    logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
}

module.exports = {getCashTypes, getEvents, searchEmployee, getDefaultMaternityCash, getDefaultCdwCash };
