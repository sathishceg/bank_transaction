const app = require("express")();
const bodyParser = require('body-parser');
const PORT = 3000;
const routes = require('./lib/routes');
const db = require('./lib/db');
const BOOTSTRAP = 'bootstrap';

app.use(bodyParser.json());
app.use('/',routes);

function startServer(){
  return new Promise((resolve, reject) => {
    app.listen(PORT, (err)=> {
      if(err){
        return reject(err);
      }
      return resolve();
    })
  });
}

// This will do setup before starting server
async function setup(){
  const arg = process.argv.slice(2)[0];
  await db.connect();
  // Will create tables and create sample record if bootstrap option is passed.
  if(arg && arg == BOOTSTRAP){
    await db.createBalanceTable();
    await db.createTransactionsTable();
    await db.createRecords();
  }
  await startServer();
}

setup().then(() => {
  console.log("Server started");
}).catch((err) => {
  console.log("Server starting failed", err.stack);
})
