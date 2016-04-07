/**
 * Controllers
 */
var AccountsController = require('./controllers/mvpd.js');

/**
 * Routes
 */
module.exports.setup = function (app) {
	/* 
	 * Public Routes
	 * 
	**/

	app.get('/:id', AccountsController.getAccountDetailsById);

	app.all('/*', function (req, res) {
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
 		res.status(404).send({ code: "ResourceNotFound", error: "Resource requested does not exist"}); 
	});	
	
};