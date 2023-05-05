const bcrypt = require("bcrypt");
const constants = require("../constants/constants");

/**
 * Method to hash password and return hashed password
 * @param {String} password
 * @returns encryptedPassword | ""
 */
const hashPassword = async (password) => {
    const saltRounds = await bcrypt.genSalt(constants.SALT_ROUNDS);
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    console.log(encryptedPassword);
    return encryptedPassword;
};

/**
 * Method to check if the given password is similar to the hashed password
 * @param {String} storedPassword
 * @param {String} passwordToCheck
 * @returns true | false
 */
const comparePassword = async (storedPassword, passwordToCheck) => {
    return await bcrypt.compare(passwordToCheck, storedPassword);
};

module.exports = {
    hashPassword,
    comparePassword,
};
