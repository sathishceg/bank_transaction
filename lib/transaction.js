const {Balance} = require('../model/balance');
const {Transaction} = require('../model/transaction');
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;
const OK_STATUS = 200;
const NOT_FOUND_MSG = "Account not found";
const BAD_REQUEST_MSG = "No sufficient balance to do the transaction";
const INTERNAL_SERVER_ERROR_MSG = "Something went wrong, please try again";
const TRANSACTION_ERROR = 'TRANSACTION_FAILURE';
const UPDATE_BALANCE_ERROR = 'BALANCE_UPDATE_FAILED';

function checkBalance(balance_amt,amount){
  var error = new Error
  var error_exists = false;
  if(!balance_amt){
    error.message = {message: NOT_FOUND_MSG};
    error.status = NOT_FOUND;
    error_exists = true;
  }
  if(balance_amt.balance < amount){
    error.message = {message: BAD_REQUEST_MSG};
    error.status = BAD_REQUEST;
    error_exists = true;
  }
  if(error_exists){
    throw error;
  }
}

async function process(data){
  try{
    balance = await Balance.getAccountBalance([data.from]);
    checkBalance(balance[0], data.amount);
    var transaction_id = await Transaction.createTransaction(data.from, data.amount);
    await Balance.updateBalance(data.amount, data.to);
    return transaction_id;
  }
  catch(exp){
    if(exp.type && exp.type == UPDATE_BALANCE_ERROR){
      await Transaction.deleteTransaction(transaction_id);
    }
    throw exp;
  }
}

async function constructResponse(data, trans_id, res){
  let from_balance = await Balance.getAccountBalance(data.from);
  let to_balance = await Balance.getAccountBalance(data.to);
  let body = { id: trans_id, from: {id: data.from, balance: from_balance.balance},
          to: {id: data.to, balance: to_balance.balance}, transfered: data.amount};
  res.status(OK_STATUS).send(body);
}

function processTransaction(req, res){
  process(req.body).then((trans_id)=>{
    constructResponse(req.body, trans_id, res)
  }).catch((err)=>{
    if(err.status){
      res.status(err.status).send(err.message)
    }
    else{
      res.status(INTERNAL_SERVER_ERROR).send({message: INTERNAL_SERVER_ERROR_MSG});
    }
  })
}
module.exports = {
  processTransaction
}
