// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  database: 'test_db',
  user: 'admin',
  password: 'admin123',
  connectionLimit: 5,
});

module.exports = pool;
