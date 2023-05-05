const response = require("../constants/response.constants");

/**
 * Method for returning response object for updating details
 * @param {Object} data
 * @returns responseObject
 */
const httpUpdateResponse = (data) => {
  return {
    status: response.SUCCESS.updateSuccess,
    code: 200,
    data: data,
  };
};

/**
 * Method for returning response object for details retrieval
 * @param {Object} data
 * @returns responseObject
 */
const httpGetResponse = (data) => {
  return {
    status: response.SUCCESS.getSuccess,
    code: 200,
    data: data,
  };
};

/**
 * Method for returning response for authorized access
 * @param {Object} token
 * @returns responseObject
 */
const httpAuthorizedResponse = (token) => {
  return {
    status: response.SUCCESS.authorized,
    code: 200,
    data: token,
  };
};

/**
 * Method for returning response object for insertion
 * @param {Object} data
 * @returns responseObject
 */
const httpAddResponse = (data) => {
  return {
    status: response.SUCCESS.addSuccess,
    code: 201,
    data: data,
  };
};

/**
 * Method for returning the response if the input is invalid
 * @param {Object} data
 * @returns responseObject
 */
const httpInvalidInputResponse = (data) => {
  return {
    status: response.ERROR.invalidInput,
    code: 400,
    data: data,
  };
};

/**
 * Method for returning the response if the record already exists
 * @param {Object} data
 * @returns responseObject
 */
const httpRecordAlreadyExistsResponse = (data) => {
  return {
    status: response.ERROR.alreadyExists,
    code: 403,
    data: data,
  };
};

/**
 * Method for returning the response if the there is no requested response
 * @param {Object} data
 * @returns responseObject
 */
const httpNoRecordsResponse = (data) => {
  return {
    status: response.ERROR.noRecords,
    code: 404,
    data: data,
  };
};

/**
 * Method for returning response for unauthorized access
 * @param {Object} data
 * @returns responseObject
 */
const httpUnauthorizedResponse = (data) => {
  return {
    status: response.ERROR.unauthorized,
    code: 401,
    data: data,
  };
};

/**
 * Method for returning response for server errors
 * @param {Object} data
 * @returns responseObject
 */
const httpServerErrorResponse = (data) => {
  return {
    status: response.ERROR.serverError,
    code: 500,
    data: data,
  };
};

const httpMethodNotImplementedResponse = (data) => {
  return {
    status: response.ERROR.notImplementedMethod,
    code: 501,
    data: data,
  };
};

module.exports = {
  httpInvalidInputResponse,
  httpNoRecordsResponse,
  httpServerErrorResponse,
  httpUnauthorizedResponse,
  httpAuthorizedResponse,
  httpAddResponse,
  httpUpdateResponse,
  httpGetResponse,
  httpMethodNotImplementedResponse,
  httpRecordAlreadyExistsResponse,
};
