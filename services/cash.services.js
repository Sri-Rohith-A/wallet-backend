const { createConnection } = require("../utils/dbConnection.utils");
const { httpGetResponse, httpServerErrorResponse } = require("../utils/response.utils");
const crudUtils = require("../utils/crud.utils");
const logger = require("../utils/logger.utils");
const constants = require("../constants/constants");
/**
 * Service for getting cash types from database
 * @param {*} req
 * @returns responseObject
 */
const getCashTypes = async(req,res) => {
    try {
        const connection = await createConnection();
        const query = `SELECT cash_type_id as cashTypeId, cash_name as cashType FROM cash_type`;
        const data = await crudUtils.executeQuery(connection, query);
        connection.release();
        return httpGetResponse(data);
    }
    catch(error) {
        logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${error.message}`);
        return httpServerErrorResponse(error);
    }
}

/**
 * Service for getting event list from database
 * @param {*} req
 * @returns responseObject
 */
const getEvents = async(req,res) => {
    try {
        const connection = await createConnection();
        const query = `SELECT event_name as eventName, event_id as eventId, DATE_FORMAT(start_date, '%d-%m-%Y %r') as startDate, DATE_FORMAT(end_date, '%d-%m-%Y %r') as endDate FROM events where status IN ('upcoming','started')`;
        const data = await crudUtils.executeQuery(connection, query);
        connection.release();
        return httpGetResponse(data);
    }
    catch(error) {
        logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${error.message}`);
        return httpServerErrorResponse(error);
    }
}

/**
 * Service for getting employee id and employee name from database
 * @param {*} req
 * @returns responseObject
 */
const searchEmployee = async(req, res) => {
    try {
        const connection = await createConnection();
        const empId = req.query['search-query'];
        const bucketId = req.query['bucket-id'];
        let query;
        if(bucketId == constants.CASH_TYPE_ID.MATERNITY_CASH_ID){
            query = `SELECT concat(employee_id,' - ', employee_name) as emp_name FROM users WHERE employee_id LIKE "${empId}%" and gender="female";`;
        }else{
            query = `SELECT concat(employee_id,' - ', employee_name) as emp_name FROM users WHERE employee_id LIKE "${empId}%";`;
        }
        const data = await crudUtils.executeQuery(connection, query);
        const employeeArray = data.map((emp) => emp.emp_name);        
        connection.release();
        return httpGetResponse(employeeArray);
    }
    catch(error) {
        logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${error.message}`);
        return httpServerErrorResponse(error);
    }
}

/**
 * Service for getting default maternity cash for a selected female employee based on the location id from database
 * @param {*} req
 * @returns responseObject
 */
const getDefaultMaternityCash = async(req, res) => {
    try {
        const connection = await createConnection();
        const employeeDetails = req.query.employee;
        const employeeDetailsArray = employeeDetails.split("-");
        const employeeId = employeeDetailsArray[0];
        const query = `SELECT default_amount as maternityCash FROM configs 
                            INNER JOIN users ON configs.location_id = users.location_id 
                            INNER JOIN cash_type ON cash_type.cash_type_id = configs.cash_type_id 
                            WHERE users.employee_id = ${employeeId} and cash_type.cash_name = "maternity"`;
        const data = await crudUtils.executeQuery(connection, query);
        connection.release();
        return httpGetResponse(data);
    }
    catch(error) {
        logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${error.message}`);
        return httpServerErrorResponse(error);
    }
}

/**
 * Service for getting default CDW cash for a selected employee based on the location id from database
 * @param {*} req
 * @returns responseObject
 */
const getDefaultCDWCash = async(req, res) => {
    try {
        const connection = await createConnection();
        const employeeDetails = req.query.employee;
        const employeeDetailsArray = employeeDetails.split("-");
        const employeeId = employeeDetailsArray[0];
        const query = `SELECT default_amount as cdwCash FROM configs 
                            INNER JOIN users ON configs.location_id = users.location_id 
                            INNER JOIN cash_type ON cash_type.cash_type_id = configs.cash_type_id 
                            WHERE users.employee_id = ${employeeId} and cash_type.cash_name = "cdw"`;
        const data = await crudUtils.executeQuery(connection, query);
        connection.release();
        return httpGetResponse(data);
    }
    catch(error) {
        logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${error.message}`);
        return httpServerErrorResponse(error);
    }
}

module.exports = {getCashTypes, getEvents, searchEmployee, getDefaultMaternityCash, getDefaultCDWCash };