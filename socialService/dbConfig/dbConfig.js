require('dotenv').config();
const mysql = require('mysql2');

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const pool = mysql.createPool({
  host: '127.0.0.1', // Explicitly use IPv4 address
  port: 3306,
  user: 'ahmed',
  password:  '123456',
  database:  'social',
});

// Verify the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
  connection.release();
});

module.exports = pool;
