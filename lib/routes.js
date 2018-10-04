const routes = require('express').Router();
const transaction = require('./transaction');

routes.post('/transfer', transaction.processTransaction);

module.exports = routes;
