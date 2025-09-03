// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'mqtt_project',
  user: 'api',
  password: 'api123',
  host: '127.0.0.1',      // use TCP
  port: 3306,              // TCP port

  connectionLimit: 5,

});

module.exports = pool;
