const {Balance} = require('../model/balance');
const {Transaction} = require('../model/transaction');

async function process(data){
  await Balance.updateBalance(data.to, data.amount);
  await Transaction.createTransaction(data.from, data.amount);
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
