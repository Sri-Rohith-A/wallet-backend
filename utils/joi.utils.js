const Joi = require("joi").extend(require('@joi/date'));

const schemas = {
  userSchema: Joi.object({
    empName: Joi.string().max(30).regex(/^[a-zA-Z]+$/).required(),
    empId: Joi.number().integer().required(),
    gender: Joi.string().max(6).regex(/^[a-zA-Z]+$/).required(),
    empMail: Joi.string().max(30).email().required(),
    contactNumber: Joi.string().length(10).regex(/^[6789]\d{9}$/).required(),
    businessUnit: Joi.number().integer().required(),
    location: Joi.number().integer().required(),
    status: Joi.string().max(8).regex(/^[a-zA-Z]+$/).required(),
  }),
  userUpdateSchema: Joi.object({
    empName: Joi.string().max(30).regex(/^[a-zA-Z]+$/).required(),
    empId: Joi.number().integer().required(),
    gender: Joi.string().max(6).regex(/^[a-zA-Z]+$/).required(),
    empMail: Joi.string().max(30).email().required(),
    contactNumber: Joi.string().length(10).regex(/^[6789]\d{9}$/).required(),
    businessUnit: Joi.number().integer().required(),
    location: Joi.number().integer().required(),
    status: Joi.string().max(8).regex(/^[a-zA-Z]+$/).required(),
    startDate:Joi.date().format("YYYY-MM-DD HH:mm").optional(),
    endDate:Joi.date().format("YYYY-MM-DD HH:mm").optional(),
  }),
  configSchema: Joi.array().items(
    Joi.object({
      locationId: Joi.number().integer().min(1).max(100).required(),
      cashTypeId: Joi.number().integer().min(1).max(100).required(),
      defaultAmount: Joi.number().required(),
      defaultCarryOverDays: Joi.number().optional(),
    })
  ),
  adminSchema: Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

/**
 * Method to validate data
 * @param {*} data data to be validated
 * @param {*} schema the schema the data is validated against
 * @returns validation result
 */
const joiValidation = (data, schema) => {
  return schemas[schema].validate(data, { abortEarly: false });
};

module.exports = joiValidation;
