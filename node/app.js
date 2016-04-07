var express = require('express');

var env = (process.env.NODE_ENV || "development");
GLOBAL.config = require('./config/config.'+env);
var port = GLOBAL.config.port;

var routes = require('./routes');
/**
 * Create Express server.
 */
var app = express();

//Get routes applicable for the server
routes.setup(app);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
	// log it
  	console.error(err.stack);
  	res.status(500).send({ code: "InternalError", error: "Something went wrong on the server."});
}

/**
 * Start Express server.
 */

app.listen(port, function() {
  console.log("✔ Express server listening on port %d in %s mode", GLOBAL.config.port, GLOBAL.config.env);
});
