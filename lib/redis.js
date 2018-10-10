// Using fakeredis because this will cause a mandatory dependency to start the server.This can be replaced with actual redis as well but the implementation does not change.
const redis = require('fakeredis');
const client = redis.createClient();
const NOT_SET = null,
      P_EXPIRE = 'PX',
      TTL = 20000,
      ONLY_IF_NOT_SET = 'NX';
const BAD_REQUEST = 400;
const BAD_REQUEST_MSG = "Last transaction was less than 20 seconds, please try later";

function duplicateTransaction(){
  var err = new Error;
  err.message = BAD_REQUEST_MSG;
  err.status = BAD_REQUEST;
  return err;
}

// This function will Check if user tapped transfer button twice based on the redis key.
// Lets say an account 101 has transferred 10,000 to account 201, to do the same transaction account 101 can do only after 20 seconds.
function checkValidTrans(from_acc, to_acc){
  return new Promise((resolve, reject) =>{
    const key = `TRANSACTION::${from_acc}::${to_acc}`;
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
