const db = require('../lib/db.js');
const uuidv4 = require('uuid/v4');
const TABLE_NAME = 'transactions';

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
          return reject(error)
        }
        return resolve(results);
      });
    });

  }
}

exports.Transaction = new Transaction();
