const mysql = require('mysql2');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Database configuration is missing!');
}

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 100,
  waitForConnections: true,
  queueLimit: 0,
});
const db = pool.promise();

module.exports = db;