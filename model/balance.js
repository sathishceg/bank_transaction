const db = require('../lib/db.js');
const TABLE_NAME = 'balances';
const FIELDS = {
  balance: 'balance',
  acc_no: 'account_number'
};

class Balance{

  add_balance(amount, acc_num, cb){
    const query = `INSERT INTO ${TABLE_NAME} (${FIELDS.balance}, ${FIELDS.acc_no}) values (?, ?)`;
    db.execute_query(query, [amount, acc_num], (error, results) => {

    });
  }

  get_account_balance(){
    
  }
}

exports.Balance = new Balance();
