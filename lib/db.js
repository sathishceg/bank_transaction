'use strict';
const mysql = require('mysql');
const mysqlConfig = require('../config/db.json');
var connection = mysql.createConnection(mysqlConfig);

function connect(){
  return new Promise((resolve, reject) => {
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return reject(err);
      }
      console.log('mysql connection succeeded ');
      return resolve();
    });
  });
}

function execute_query(query, values, cb){
  connection.query(query, values, (error, results, fields) => {
    return cb(error, results, fields);
  })
}

module.exports = {
  connect,
  execute_query
};
