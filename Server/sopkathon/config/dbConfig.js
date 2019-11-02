const mysql = require('promise-mysql');

const dbConfig = {
    host: 'db-sopt-server.cc4s99yjuuhg.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'haelykim0812',
    database: 'sopt-server',
    dateStrings: 'date',
};
module.exports = mysql.createPool(dbConfig);

//정보 파일