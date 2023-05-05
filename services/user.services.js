const { createConnection } = require("../utils/dbConnection.utils");
const crudUtils = require("../utils/crud.utils");
const dateFormat = require("../utils/date.utils");
const constants = require("../constants/constants");
const responseConstants = require("../constants/response.constants");
const { dataLengthCheck } = require("../utils/data.utils");
const { ACCESS_LEVELS } = require("../constants/constants");

/**
 * Service for adding details of users to database
 * @param {employeeId} - user employee id
 * @returns responseObject
 */
const getUserService = async (employeeId) => {
  let response;
  try {
    const connection = await createConnection();

    // 2 in the query refers to the maternity cash in the database
    const query = `select employee_id, employee_name, employee_email, contact_number, status,
    gender, location_name, bu.business_unit_name, c.start_date, c.end_date from users u
    join locations l on l.location_id=u.location_id
    join business_units bu on bu.business_unit_id=u.business_unit_id
    left outer join (select * from cash where cash_type_id=${constants.CASH_TYPE_ID.MATERNITY_CASH_ID}) c using (employee_id)
    where employee_id=${employeeId};`;

    const userData = (await crudUtils.executeQuery(connection, query))[0];
    if (userData && userData.startDate !== constants.UNDEFINED) {
      userData.start_date = dateFormat(userData.start_date);
      userData.end_date = dateFormat(userData.end_date);
    }
    response = { status: true, data: userData };
    connection.release();
  } catch (error) {
    response = { status: false, data: error.message };
  }
  return response;
};

/**
 * Service for adding details of users to database
 * @param {userData} - user data to be added
 * @returns responseObject
 */
const addUserService = async (userData) => {
  let response;
  try {
    const connection = await createConnection();

    let dateObject = new Date();
    let dateTime = dateFormat(dateObject);

    let record = {
      employee_id: userData.empId,
      employee_name: userData.empName,
      employee_email: userData.empMail,
      gender: userData.gender,
      contact_number: userData.contactNumber,
      joined_date: dateTime,
      status: userData.status,
      location_id: userData.location,
      business_unit_id: userData.businessUnit,
      access_level: ACCESS_LEVELS.USER,
    };

    let employeeIdMatchedResultSet = await crudUtils.readRecordsByFieldName(connection, "users", ["employee_id"], "employee_id", userData.empId);

    if (!dataLengthCheck(employeeIdMatchedResultSet)) {
      await crudUtils.createRecord(connection, "users", record);
      response = { status: true, data: responseConstants.SUCCESS.addSuccess };
    } else {
      response = { status: false, data: responseConstants.ERROR.alreadyExists };
    }

    connection.release();
  } catch (error) {
    response = { status: false, data: error.message };
  }

  return response;
};

/**
 * Service for adding details of users to database
 * @param {userData} - user data to be updated
 * @returns responseObject
 */
const updateUserService = async (userId, userData) => {
  let response;
  try {
    const connection = await createConnection();
    let record = {
      employee_id: userData.empId,
      employee_name: userData.empName,
      employee_email: userData.empMail,
      gender: userData.gender,
      contact_number: userData.contactNumber,
      status: userData.status,
      location_id: userData.location,
      business_unit_id: userData.businessUnit,
    };
    //checking if user is present
    let employeeIdMatchedResultSet = await crudUtils.readRecordsByFieldName(connection, "users", ["employee_id"], "employee_id", userId);
    if (!dataLengthCheck(employeeIdMatchedResultSet)) {
      response = { status: true, data: responseConstants.USER.notFound };
    } else if (userId != userData.empId) {
      response = { status: true, data: responseConstants.USER.idError };
    } else {
      //updating user record in users table
      await crudUtils.updateRecords(connection, "users", "employee_id", userId, record);
      if (userData.startDate && userData.endDate) {
        //updating dates in cash table and cash type id 2 indicates the maternity cash
        const updateDateQuery = `update cash set start_date="${userData.startDate}",end_date="${userData.endDate}"
        where employee_id=${userId} and cash_type_id=${constants.CASH_TYPE_ID.MATERNITY_CASH_ID}`;
        await crudUtils.executeQuery(connection, updateDateQuery);
      }
      response = { status: true, data: responseConstants.USER.updateSuccess };
    }
    connection.release();
  } catch (error) {
    response = { status: false, data: error.message };
  }

  return response;
};

/**
 * Service for getting details of locations and business units from database
 * @returns responseObject
 */
const getLocationsAndBuService = async () => {
  let response;
  try {
    const connection = await createConnection();
    const locations_data = await crudUtils.readAllRecords(connection, "locations", ["location_id", "location_name"]);
    const businesses_data = await crudUtils.readAllRecords(connection, "business_units", ["business_unit_id", "business_unit_name"]);
    let data = {
      locations: locations_data,
      business_units: businesses_data,
    };
    response = { status: true, data: data };
    connection.release();
  } catch (error) {
    response = { status: false, data: error.message };
  }
  return response;
};

/**
 * Service for stopping the maternity cash service
 * @param {userData} - user data to be updated
 * @returns responseObject
 */
const stopMaternityCashService = async (userId) => {
  let response;
  try {
    const connection = await createConnection();
    let employeeIdMatchedResultSet = await crudUtils.readRecordsByFieldName(connection, "users", ["employee_id", "gender"], "employee_id", userId);
    if (!dataLengthCheck(employeeIdMatchedResultSet)) {
      //checking if user is present
      response = { status: true, data: responseConstants.USER.notFound };
    } else if (employeeIdMatchedResultSet[0].gender === constants.GENDER.MALE) {
      //checking if user is male
      response = { status: true, data: responseConstants.USER.maternityNotEligible };
    } else {
      //updating cash table if user has maternity cash
      const endDate = dateFormat(new Date());
      const updateDateQuery = `update cash set end_date="${endDate}" where employee_id=${userId} 
      and cash_type_id=${constants.CASH_TYPE_ID.MATERNITY_CASH_ID}`;
      await crudUtils.executeQuery(connection, updateDateQuery);
      const getDateQuery = `select end_date from cash where cash_type_id=${constants.CASH_TYPE_ID.MATERNITY_CASH_ID} and employee_id=${userId}`;
      const getDateResponse = await crudUtils.executeQuery(connection, getDateQuery);
      if (dateFormat(getDateResponse[0].end_date) === endDate) {
        response = { status: true, data: { endDate: endDate } };
      } else {
        response = { status: true, data: responseConstants.USER.noMaternityCash };
      }
    }
    connection.release();
  } catch (error) {
    response = { status: false, data: error.message };
  }
  return response;
};

module.exports = {
  getUserService,
  addUserService,
  updateUserService,
  getLocationsAndBuService,
  stopMaternityCashService,
};
