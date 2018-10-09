const db = require('../lib/db.js');
const uuidv4 = require('uuid/v4');
const TABLE_NAME = 'transactions';
const ERROR_TYPE = 'TRANSACTION_FAILURE';
const TRANS_ERROR_MSG = "Error while creating transaction, please try after sometime";
const INTERNAL_SERVER_ERROR_CODE = 500;

function update_error_type(err){
  err.type = ERROR_TYPE;
  err.message = {"message": TRANS_ERROR_MSG};
  err.status = INTERNAL_SERVER_ERROR_CODE;
}

class Transaction{
  createTransaction(from_acc, amt, cb){
    const ref = uuidv4();
    const query = `INSERT INTO ${TABLE_NAME} SET ?`;
    const data = {
      reference: ref,
      amount: amt,
      account_number: from_acc
    };
    return new Promise((resolve, reject) => {
      db.connection.query(query, data, (error, results, fields) => {
        if(error){
          update_error_type(error);
          return reject(error)
        }
        return resolve(ref);
      });
    });

  }

  deleteTransaction(trans_id){
    return new Promise((resolve, reject) => {
      var query = `DELETE FROM ${TABLE_NAME} WHERE reference  = ?`;
      db.connection.query(query, trans_id, (error, results, fields) => {
        if(error){
          return reject(error)
        }
        return resolve();
      });
    });
  }
}

exports.Transaction = new Transaction();
