const mysql = require("mysql2/promise");
require("dotenv").config();

/* This code creates a connection pool using the `mysql2` library for connecting to a MySQL database. */
const pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

/**
 * The function creates a database connection using a connection pool and returns the connection
 * object.
 */
const createConnection = async () => {
    return await pool.getConnection();
};

module.exports = { createConnection };
