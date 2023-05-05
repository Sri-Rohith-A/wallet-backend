const logger = require("../utils/logger.utils");
const userServices = require("../services/user.services");
const {
  httpAddResponse,
  httpRecordAlreadyExistsResponse,
  httpServerErrorResponse,
  httpGetResponse,
  httpUpdateResponse,
  httpNoRecordsResponse,
  httpInvalidInputResponse,
} = require("../utils/response.utils");
const responseConstants = require("../constants/response.constants");
const { dataLengthCheck } = require("../utils/data.utils");

/**
 * Controller for getting details of a existing user from database
 * @param {*} req
 * @param {*} res
 */
const getUser = async (req, res) => {
  logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
  let response;
  const serviceResponse = await userServices.getUserService(req.params.employeeId);
  if (serviceResponse.status) {
    //if get user service ran successfully
    if (!dataLengthCheck(serviceResponse.data)) {
      response = httpNoRecordsResponse(responseConstants.USER.notFound);
    } else {
      response = httpGetResponse(serviceResponse.data);
    }
    logger.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
  } else {
    //if get user service had any error
    response = httpServerErrorResponse(serviceResponse.data);
    logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
  }
  res.status(response.code).json(response);
  logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
};

/**
 * Controller for adding details of a new user to database
 * @param {*} req
 * @param {*} res
 */
const addUser = async (req, res) => {
  logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);

  let response;
  const serviceResponse = await userServices.addUserService(req.body);
  if (serviceResponse.status) {
    response = httpAddResponse(responseConstants.USER.addSuccess);
    logger.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
  } else {
    if (serviceResponse.data === responseConstants.ERROR.alreadyExists) {
      response = httpRecordAlreadyExistsResponse(responseConstants.USER.alreadyExists);
    } else {
      response = httpServerErrorResponse(serviceResponse.data);
    }

    logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
  }
  res.status(response.code).json(response);
  logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
};

/**
 * Controller for updating details of a existing user from database
 * @param {*} req
 * @param {*} res
 */
const updateUser = async (req, res) => {
  logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
  const UPDATE_RESPONSES = {
    [responseConstants.USER.notFound]: httpNoRecordsResponse(responseConstants.USER.notFound),
    [responseConstants.USER.idError]: httpInvalidInputResponse(responseConstants.USER.idError),
    [responseConstants.USER.updateSuccess]: httpUpdateResponse(responseConstants.USER.updateSuccess),
  };
  let response;
  const serviceResponse = await userServices.updateUserService(req.params.employeeId, req.body);
  if (serviceResponse.status) {
    //if update user service ran successfully
    response = UPDATE_RESPONSES[serviceResponse.data];
    if (serviceResponse.data === responseConstants.USER.updateSuccess) {
      logger.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    } else {
      logger.warn(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    }
  } else {
    //if update user service had any error
    response = httpServerErrorResponse(serviceResponse.data);
    logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
  }
  res.status(response.code).json(response);
  logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
};

/**
 * Controller for getting details of locations and business units from database
 * @param {*} req
 * @param {*} res
 */
const getLocationsAndBu = async (req, res) => {
  logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);

  const serviceResponse = await userServices.getLocationsAndBuService();
  if (serviceResponse.status) {
    response = httpGetResponse(serviceResponse.data);
    logger.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
  } else {
    response = httpServerErrorResponse(serviceResponse.data);
    logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
  }
  res.status(response.code).json(response);

  logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
};

/**
 * Controller for stopping the maternity cash received by female user
 * @param {*} req
 * @param {*} res
 */
const stopMaternityCash = async (req, res) => {
  logger.info(`START:: URL:${req.originalUrl}, METHOD:${req.method}`);
  let response;

  const serviceResponse = await userServices.stopMaternityCashService(req.params.employeeId);
  if (serviceResponse.status) {
    //if update user service ran successfully
    if (serviceResponse.data && serviceResponse.data.endDate) {
      response = httpUpdateResponse(serviceResponse.data);
      logger.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    } else {
      response = httpNoRecordsResponse(serviceResponse.data);
      logger.warn(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    }
  } else {
    //if update user service had any error
    response = httpServerErrorResponse(serviceResponse.data);
    logger.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
  }
  res.status(response.code).json(response);
  logger.info(`END:: URL:${req.originalUrl}, METHOD:${req.method}`);
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  getLocationsAndBu,
  stopMaternityCash,
};
