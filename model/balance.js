const db = require('../lib/db.js');
const TABLE_NAME = 'balances';
const FIELDS = {
  balance: 'balance',
  acc_no: 'account_number'
};
const ERROR_TYPE = "BALANCE_UPDATE_FAILED";
const UPDATE_ERROR_MSG = "Error while updating balance, please try after sometime";
const INTERNAL_SERVER_ERROR_CODE = 500;

function insertOrUpdateToAccount(amount, acc_num){
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${TABLE_NAME} SET ${FIELDS.acc_no} = ?, ${FIELDS.balance} = ? ON DUPLICATE KEY UPDATE ${FIELDS.balance} = ${FIELDS.balance} + ?`;
    db.connection.query(query, [acc_num, amount, amount], (error, results, fields) => {
      if(error){
        connection.rollback(function() {
          update_error_type(error);
          reject(error);
        });
      }
      resolve();
    });
  });
}

function updateFromAccount(amount, acc_num){
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${TABLE_NAME} set ${FIELDS.balance} = ${FIELDS.balance} - ? WHERE ${FIELDS.acc_no} = ?`;
    db.connection.query(query, [amount, acc_num], (error, results, fields) => {
      if(error){
        connection.rollback(function() {
          update_error_type(error);
          reject(error);
        });
      }
      resolve();
    });
  });
}

function beginTransaction(){
  return new Promise((resolve, reject) => {
    db.connection.query('START TRANSACTION',function(err) {
      if (err) {
        update_error_type(err);
        reject(err);
      }
      resolve();
    });
  });
}

function commitTransaction(){
  return new Promise((resolve, reject) => {
    db.connection.query('COMMIT',function(err) {
      if (err) {
        update_error_type(err);
        reject(err);
      }
      resolve();
    });
  });
}

function update_error_type(err){
  err.type = ERROR_TYPE;
  err.message = {"message": UPDATE_ERROR_MSG};
  err.status = INTERNAL_SERVER_ERROR_CODE;
}

class Balance{

  async updateBalance(amount, to_acc_num, from_acc_num){
    await beginTransaction();
    await insertOrUpdateToAccount(amount, to_acc_num);
    await updateFromAccount(amount, from_acc_num);
    await commitTransaction();
  }

  getAccountBalance(acc_num){
    var query = `select balance from ${TABLE_NAME} where ${FIELDS.acc_no} in (?) `;
    return new Promise((resolve, reject) => {
      db.connection.query(query, acc_num, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }
}

exports.Balance = new Balance();
