// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  database: 'mqtt_project',
  user: 'admin',
  password: 'admin123',
  connectionLimit: 5,
});

module.exports = pool;
