const app = require("express")();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.json());
app.listen(PORT, ()=> {
  console.log("Server Started");
})
