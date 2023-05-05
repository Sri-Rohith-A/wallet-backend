const { createConnection } = require("../utils/dbConnection.utils");
const { httpGetResponse, httpServerErrorResponse, httpUpdateResponse } = require("../utils/response.utils");
const crudUtils = require("../utils/crud.utils");
const logger = require("../utils/logger.utils");

/**
 * Service for getting details of configs from database
 * @param {*} req
 * @returns responseObject
 */
const getConfigs = async (req) => {
    try {
        const connection = await createConnection();
        const query = `select con.location_id as locationId, loc.location_name as locationName, con.cash_type_id as cashTypeId
        , cashtype.cash_name as cashType, con.default_amount as defaultAmount, con.default_carryover_days as carryOverDays
         from configs as con inner join locations as loc on loc.location_id = con.location_id 
         inner join cash_type as cashtype on cashtype.cash_type_id = con.cash_type_id;`;
        const data = await crudUtils.executeQuery(connection, query);
        connection.release();
        return httpGetResponse(data);
    } catch (error) {
        logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${error.message}`);
        return httpServerErrorResponse(error);
    }
};

/**
 * Service for updating configs to database
 * @param {*} req
 * @returns responseObject
 */
const modifyConfigs = async (req) => {
    try {
        const configs = req.body;
        const connection = await createConnection();
        configs.forEach(async (config) => {
            if (config.defaultCarryOverDays) {
                const query = `UPDATE configs SET default_amount=${config.defaultAmount},default_carryover_days=${config.defaultCarryOverDays} where location_id=${config.locationId} and cash_type_id=${config.cashTypeId}`;
                await crudUtils.executeQuery(connection, query);
            } else {
                const query = `UPDATE configs SET default_amount=${config.defaultAmount} where location_id=${config.locationId} and cash_type_id=${config.cashTypeId}`;
                await crudUtils.executeQuery(connection, query);
            }
        });
        connection.release();
        return httpUpdateResponse("Updated successfully");
    } catch (error) {
        logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${error.message}`);
        return httpServerErrorResponse(error);
    }
};

module.exports = {
    getConfigs,
    modifyConfigs,
};
