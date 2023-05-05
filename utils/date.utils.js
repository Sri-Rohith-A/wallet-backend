const dayjs = require("dayjs");

/**
 * Method to get Date object and return the split date and time object
 * @param {Object} date object
 * @returns dateTime object
 */
const dateFormat = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

module.exports = dateFormat;
