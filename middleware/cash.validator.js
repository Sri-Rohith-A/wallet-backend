const logger = require("../utils/logger.utils");
const {httpInvalidInputResponse} = require('../utils/response.utils');
const errorResponseConstants = require("../constants/response.constants");

/**
 * Method to validate search employee data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns validationResult
 */
const validateSearchEmployee = (req, res, next) => {
    const empId = req.query['search-query'];

    if((/^[0-9]{3,4}$/).test(empId) == false) {
        response = httpInvalidInputResponse(errorResponseConstants.CASH.enterAtleastThreeDigits);
        logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
        res.status(response.code).send(response);
        return;
    }
   next();
}

//Currently in progress
const validateAddMoney = (req,res,next) => {
    
}

module.exports = {validateSearchEmployee};