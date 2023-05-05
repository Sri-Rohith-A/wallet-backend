const logger = require("../utils/logger.utils");
const { httpInvalidInputResponse } = require("../utils/response.utils");
const joiValidation = require("../utils/joi.utils");
const responseConstants = require("../constants/response.constants");

/**
 * Method to validate user data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns whether user is valid
 */
const validateUser = (req, res, next) => {
  const userData = req.body;
  const validationResult = joiValidation(userData, "userSchema");

  if (validationResult.error) {
    validationErrorDetails = validationResult.error.details.map((e) => e.message);

    let response = httpInvalidInputResponse(validationErrorDetails);
    logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    res.status(response.code).send(response);
    return;
  }
  next();
};

/**
 * Method to validate user update data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns whether user update data is valid
 */
const validateUserUpdateData = (req, res, next) => {
  const userData = req.body;
  const validationResult = joiValidation(userData, "userUpdateSchema");

  let response;
  if (isNaN(req.params.employeeId)) {
    response = httpInvalidInputResponse(responseConstants.ERROR.invalidId);
  }

  if (validationResult.error) {
    validationErrorDetails = validationResult.error.details.map((e) => e.message);
    response = httpInvalidInputResponse(validationErrorDetails);
  }

  if (response && response.code === 400) {
    logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    res.status(response.code).send(response);
    return;
  } else {
    next();
  }
};

/**
 * Method to validate user employee id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns whether the user id is valid
 */
const validateEmpId = (req, res, next) => {
  let response;
  if (!isNaN(req.params.employeeId)) {
    next();
  } else {
    response = httpInvalidInputResponse(responseConstants.ERROR.invalidId);
    logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    res.status(response.code).send(response);
    return;
  }
};

module.exports = {
  validateUser,
  validateUserUpdateData,
  validateEmpId,
};
