const mysql = require('mysql2');

const pool = mysql.createPool({
    // host: process.env.host,
    // user: process.env.user,
    // password: process.env.password,
    // database: process.env.database

    host: 'localhost',
    user: 'root',
    password: '@Mck_#321',
    database: 'atd'

    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'atd2'



});

module.exports = pool.promise();
