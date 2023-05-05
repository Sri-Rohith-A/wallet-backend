/**
 * @note kindly use require("mysql2/promise") so that it will allow as to execute then in execute function
 * @note the connection objects needs to be passed to all the functions. In which that connection object is not initialized here
 */

/**
 * for executing the join queries and specific select quries and other queries
 *
 * @param {connection} connection the mysql connection object to be passed
 * @param {query} String the prepared query string for example: (SELECT * from table_name where name= ?)
 * @param {params} Array[String] the array of params to be replaced with ? in the string example : ["user"] to be replace in the where clause mentioned above line
 * @return {Object} returns object or array of objects
 */
const executeQuery = (connection, query, params) => connection.execute(query, params).then(([rows]) => rows);

/**
 * for inserting the data into the table
 *
 * @param {connection} connection the mysql connection object to be passed
 * @param {tableName} String the name of table where the operation needs to be performed
 * @param {record} Object the object with key value pairs which needs to be inserted in the table example : {userName: "user1",password: "2332"}
 * @return {Object} returns object or array of objects
 */
const createRecord = (connection, tableName, record) => {
    // getting all the record columns from the request and combining it with comma so that it forms a query
    const keys = Object.keys(record).join(",");
    // getting all the values for the particular record by comma separtated using join
    const values = Object.values(record)
        .map((value) => `'${value}'`)
        .join(",");
    // formation of the query using the derived variables
    const query = `INSERT INTO ${tableName} (${keys}) VALUES (${values})`;
    // calling the above written execute function
    return executeQuery(connection, query);
};

/**
 * for reading a specific records by field name
 *
 * @param {connection} connection the mysql connection object to be passed
 * @param {tableName} String the name of table where the operation needs to be performed
 * @param {requiredFieldNames} Array[String] the array which specifies the required column names needs to be selected from table ex : select column1,column2 from table;
 * @param {readByFieldName} String specifies which field needs to be specified in where clause for example we may want to fetch it by id or by username
 * @return {Object} returns object or array of objects
 */
const readRecordsByFieldName = (connection, tableName, requiredFieldNames, readByFieldName, readByFieldValue) => {
    // getting all the record columns from the request and combining it with comma so that it forms a query
    const columnNames = requiredFieldNames.join(",");
    // formation of the query using the derived variables
    const query = `SELECT ${columnNames} FROM ${tableName} where ${readByFieldName} = ?`;
    // calling the above written execute function
    return executeQuery(connection, query, [readByFieldValue]);
};

/**
 * to get all records in a table
 *
 * @param {connection} connection the mysql connection object to be passed
 * @param {tableName} String the name of table where the operation needs to be performed
 * @param {requiredFieldNames} Array[String] the array which specifies the required column names needs to be selected from table ex : select column1,column2 from table;
 * @return {Object} returns object or array of objects
 */
const readAllRecords = (connection, tableName, requiredFieldNames) => {
    // getting all the record columns from the request and combining it with comma so that it forms a query
    const columnNames = requiredFieldNames.join(",");
    // formation of the query using the derived variables
    const query = `SELECT ${columnNames} FROM ${tableName}`;
    // calling the above written execute function
    return executeQuery(connection, query);
};

/**
 * for updating the specific records
 *
 * @param {connection} connection the mysql connection object to be passed
 * @param {tableName} String the name of table where the operation needs to be performed
 * @param {updateByWhichField} String specifies by which field we want to update for example it may be user_id field name so it will be passed as string
 * @param {fieldValue} String value by which the particular record needs to be updated
 * @param {record} Object the object key value pairs which needs to be update in the table
 * @return {Object} returns object or array of objects
 */
const updateRecords = (connection, tableName, updateByWhichField, fieldValue, record) => {
    // getting all the record key values that needs to be updated as in the format of key1 = value1,key2 = value2 in comma separated to form query
    const keyValuePairs = Object.entries(record)
        .map(([key, value]) => `${key}='${value}'`)
        .join(",");
    // formation of the query using the derived variables
    const query = `UPDATE ${tableName} SET ${keyValuePairs} WHERE ${updateByWhichField} = ?`;
    // calling the above written execute function
    return executeQuery(connection, query, [fieldValue]);
};

/**
 * for deleting the specific records
 *
 * @param {connection} connection the mysql connection object to be passed
 * @param {tableName} String the name of table where the operation needs to be performed
 * @param {deleteByWhichField} String specifies by which field we want to delete for example it may be user_id field name so it will be passed as string to get deleted
 * @param {fieldValue} String value by which the particular record needs to be deleted
 * @return {Object} returns object or array of objects
 */
const deleteRecords = (connection, tableName, deleteByWhichField, fieldValue) => {
    // formation of the query using the values passed in the function
    const query = `DELETE FROM ${tableName} WHERE ${deleteByWhichField} = ?`;
    // calling the above written execute function
    return executeQuery(connection, query, [fieldValue]);
};

module.exports = {
    createRecord,
    readRecordsByFieldName,
    updateRecords,
    deleteRecords,
    executeQuery,
    readAllRecords,
};
