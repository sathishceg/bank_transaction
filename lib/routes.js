const routes = require('express').Router();
const transaction = require('./transaction');
const BAD_REQUEST = 400;
const BAD_REQUEST_RESP = {message: "Required parameters not present.Please make a valid request."};

function validateRequest(req, res, next) {
	body = req.body;
	if(!body.from || !body.to || !body.amount){
		return res.status(BAD_REQUEST).send(BAD_REQUEST_RESP);
	}
	next();
}

routes.use('/transfer', validateRequest)
routes.post('/transfer', transaction.processTransaction);

module.exports = routes;
