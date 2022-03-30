const mysql = require('mysql');
const connection = mysql.createPool(process.env.MY_SQL);
module.exports = connection;