const redis = require('fakeredis');
const client = redis.createClient();
const NOT_SET = null,
      P_EXPIRE = 'PX',
      TTL = 60000,
      ONLY_IF_NOT_SET = 'NX';
const BAD_REQUEST = 400;
const BAD_REQUEST_MSG = "Last transaction was less than 1 minute, please try later";

function duplicateTransaction(){
  var err = new Error;
  err.message = BAD_REQUEST_MSG;
  err.status = BAD_REQUEST;
  return err;
}

function checkValidTrans(from_acc, to_acc){
  return new Promise((resolve, reject) =>{
    const key = `TRANSACTION::${from_acc}::${to_acc}`;
    console.log(key);
    client.multi()
          .set(key, 1, P_EXPIRE, TTL, ONLY_IF_NOT_SET)
          .exec(function(error, results) {
            if(error){
              return reject(err);
            }
            if(results[0] == NOT_SET) {
              return reject({message: BAD_REQUEST_MSG, status: BAD_REQUEST});
            }
            return resolve();
          });
  });
}

module.exports={
  checkValidTrans
}
