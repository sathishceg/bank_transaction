const app = require("express")();
const bodyParser = require('body-parser');
const PORT = 3000;
const routes = require('./lib/routes');
const db = require('./lib/db');

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

async function setup(){
  await db.connect();
  await startServer();
}

setup().then(() => {
  console.log("Server started");
}).catch((err) => {
  console.log("Server starting failed", err.stack);
})
