const mysql = require('mysql2');

const pool = mysql.createPool({
    // host: process.env.host,
    // user: process.env.user,
    // password: process.env.password,
    // database: process.env.database

    // host: '124.43.8.191',
    // user: 'root',
    // password: 'Arac@%4576y$',
    // database: 'atd2'


    host: '124.43.9.57',
    user: 'root',
    password: '@Mck_#321',
    database: 'atd2'

    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'atd2'

});

module.exports = pool.promise();
