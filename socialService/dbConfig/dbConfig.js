const mysql = require('mysql');

// Create a connection pool to the database
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306, 
  user: 'ahmed',
  password: '123Ahmed',
  database: 'social'
});

module.exports = pool;
