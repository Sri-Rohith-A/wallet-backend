const jwt = require("jsonwebtoken");
require("dotenv").config();
const constants = require("../constants/constants");
const { httpUnauthorizedResponse } = require("../utils/response.utils");
const logger = require("../utils/logger.utils");

/**
 * Method to verify token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyToken = (req, res, next) => {
  let token;
  let decoded;

  try {
    //takes bearer from header
    token = req.headers.authorization.split(" ")[1];
    if (token) {
      //verifies the token and stores in decoded
      decoded = jwt.verify(token, process.env.JWTSECRETKEY);
    }
    if (decoded) {
      res.locals.token = decoded;
      next();
    } else {
      logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Invalid token`);
      const response = httpUnauthorizedResponse("Invalid Token");
      res.status(response.code).json(response);
    }
  } catch (err) {
    logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${err}`);
    const response = httpUnauthorizedResponse("Invalid Token");
    res.status(response.code).json(response);
  }
};

/**
 * Method to create a new token
 * @param {*} payload
 * @returns token
 */
const createToken = (payload) => {
  //Creates a token using the secret key
  const token = jwt.sign(payload, process.env.JWTSECRETKEY, { expiresIn: constants.EXPIRES_IN });
  return token;
};

module.exports = { verifyToken, createToken };
