const db = require('../lib/db.js');
const TABLE_NAME = 'balances';
const FIELDS = {
  balance: 'balance',
  acc_no: 'account_number'
};

function insertOrUpdate(amount, acc_num){
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${TABLE_NAME} SET ${FIELDS.acc_no} = ?, ${FIELDS.balance} = ? ON DUPLICATE KEY UPDATE balance = balance + ?`;
    db.connection.query(query, [acc_num, amount, amount], (error, results, fields) => {
      if(error){
        connection.rollback(function() {
          reject();
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
        reject(err);
      }
      resolve();
    });
  });
}

class Balance{

  async updateBalance(amount, acc_num){
    await beginTransaction();
    await insertOrUpdate(amount, acc_num);
    await commitTransaction();
  }

  get_account_balance(){

  }
}

exports.Balance = new Balance();
