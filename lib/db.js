'use strict';
const mysql = require('mysql');
const mysqlConfig = require('../config/db.json');
var connection = mysql.createConnection(mysqlConfig);
const BALANCE_TABLE_CREATE_QUERY = "CREATE TABLE balances (account_number int(11) unsigned NOT NULL,balance float(8,4) NOT NULL,PRIMARY KEY (account_number),UNIQUE KEY acc_num_unique (account_number))";
const TRANS_TABLE_CREATE_QUERY = "CREATE TABLE transactions (id int(11) unsigned NOT NULL AUTO_INCREMENT,reference varchar(50) NOT NULL,amount float(8,4) NOT NULL,account_number int(11) NOT NULL,PRIMARY KEY (id),UNIQUE KEY reference_unique (reference))";
const BOOTSTRAP_QUERY = "INSERT INTO balances (account_number, balance) VALUES (101, 100.0000)";

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

function createTransactionsTable(){
  return new Promise((resolve, reject) => {
    connection.query(TRANS_TABLE_CREATE_QUERY, (err, results, fields) => {
      if(err){
        return reject(err);
      }
      resolve();
    });
  });
}

function createBalanceTable(){
  return new Promise((resolve, reject) => {
    connection.query(BALANCE_TABLE_CREATE_QUERY, (err, results, fields) => {
      if(err){
        return reject(err);
      }
      resolve();
    });
  });
}

function createRecords(){
  return new Promise((resolve, reject) => {
    connection.query(BOOTSTRAP_QUERY, (err, results, fields) => {
      if(err){
        return reject(err);
      }
      resolve();
    });    
  });
}

module.exports = {
  connect,
  createTransactionsTable,
  createBalanceTable,
  createRecords,
  connection: connection
};
