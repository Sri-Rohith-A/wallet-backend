const { createToken } = require("../middleware/auth");
const { createConnection } = require("../utils/dbConnection.utils");
const loginResponse = require("../constants/response.constants");
const { ACCESS_LEVELS } = require("../constants/constants");
const loginUtils = require("../utils/login.utils");
const crudUtils = require("../utils/crud.utils");

/**
 * This function checks if admin is present in database and validates password
 *
 * @param {Object} adminData - admin mail and password to check with the database
 * @returns - admin validation response
 */
const loginAdminService = async (adminData) => {
    let response;
    try {
        //fetch admin data from database
        const connection = await createConnection();
        const USER_DATA = await crudUtils.readAllRecords(connection, "users", ["employee_name", "employee_email", "password", "access_level"]);

        //check whether admin is present
        const USER = USER_DATA.find((user) => user.employee_email === adminData.username && user.access_level === ACCESS_LEVELS.ADMIN);
        if (USER) {
            const IS_USER_VALID = await loginUtils.comparePassword(USER.password, adminData.password);

            //if admin present, validate password
            if (IS_USER_VALID) {
                response = {
                    status: true,
                    data: loginResponse.LOGIN.success,
                    adminName: USER.employee_name,
                    token: createToken({ adminName: USER.employee_name, adminEmail: USER.employee_email }),
                    accessLevel: USER.access_level,
                };
            } else {
                response = { status: true, data: loginResponse.LOGIN.invalidPassword };
            }
        } else {
            response = { status: true, data: loginResponse.LOGIN.invalidUser };
        }
        connection.release();
    } catch (err) {
        response = { status: false, data: err.message };
    }
    return response;
};

module.exports = { loginAdminService };
