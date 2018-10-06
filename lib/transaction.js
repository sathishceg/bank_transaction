const {Balance} = require('../model/balance');
const {Transaction} = require('../model/transaction');
console.log(Transaction);
function createTransaction(){

}
function updateBalance(){

}

async function process(data){
  await Transaction.createTransaction(data.from, data.amount);
  await Balance.updateBalance(data.from, data.amount);
}

function processTransaction(req, res){
  process(req.body).then(()=>{
    res.send("Success");
  }).catch(()=>{

  })
}
module.exports = {
  processTransaction
}
