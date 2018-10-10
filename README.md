# Bank transactions

#### Prerequisite
  - Node version 8
  - mysql
  - yarn

#### How to start server
  - Run `yarn install` to install the dependencies.
  - Run local mysql server.
  - Run `yarn start_with_bootstrap`. 
    - Run this command for the **first time**. This will create the tables and insert records to table. If you run this command again then it will fail since tables would have already been created.
  - Run `yarn start` for subsequent server starting. 

#### How to make requests
  - When starting with `yarn start_with_bootstrap` it will create an account in balances tables with account number 101. 
  - To start with you can make requests only with **101** account as **from_account** and transfer to another account. If the **to_account** is not present then it will create that account. So to start with always use the bootstraped from account number - **101**.
  - Sample curl request :
 	
    ~~~~
    curl -H "Content-Type: application/json" -X POST -d '{"from": 101,"to":201,"amount":100}' http://localhost:3000/transfer -v
    ~~~~

  - Sample response :
    ~~~~json
    {
     "id":"e8ee1724-3dc0-49f4-bf31-b6e0f3250ace",
     "from": {"id": 101}, 
     "to":{"id": 201},
     "transfered":100
    }
    ~~~~


    
