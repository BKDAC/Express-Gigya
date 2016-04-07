
var request = require('request');

// Include Gigya's SDK
var Gigya = require('../helper/gigya');


function prepareResponse(gigyaResponse){

	var template = {
  		count: 0, 
  		accounts: []
	};

	if(gigyaResponse.hasOwnProperty('results') && gigyaResponse.results.length>0)
	{// check if results exist and it is not zero
	
		for (count in gigyaResponse.results)
		{
			// transform the response as required
			var account = { 
				id: gigyaResponse.results[count].id, 
				provider: gigyaResponse.results[count].provider,
				firstName: gigyaResponse.results[count].firstName,
				hasEmail: gigyaResponse.results[count].profile.email ? true : false,
				emailVerified: gigyaResponse.results[count].emailVerified
			};
			
			template.accounts.push(account); 
			
		}
		template.count = gigyaResponse.results.length;
	}// if no results exist then the standard template with zero response will be returned
  	return template;		

};


module.exports = {

  /**
   * GET /:id
   * View user Accounts related to tied to Id
   */
  getAccountDetailsById: function (req, res, next) {

  	if (!req.params.id) return res.status(400).send({"code":"Bad Request","error":"Unknown Id"});

    var accountId = req.params.id;

	var gigyaQuery = 'SELECT UID AS id,loginProvider AS provider,isVerified AS emailVerified,profile.firstName,profile.email FROM accounts WHERE data.id =\''+accountId+'\'';
	
	if (req.query.email)
		gigyaQuery+=' and profile.email=\''+req.query.email+'\'';

	// Initialize Gigya with API Key and Secret Key
	var gigya = new Gigya(GLOBAL.config.APIKey, GLOBAL.config.secret,GLOBAL.config.gigyaURLhttps,GLOBAL.config.gigyaURL);

	gigya.accounts.search({
	  query: gigyaQuery
	},function(err, response) {
  		if (err) 
  			return next(err);
  		else{
  			//Success.
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
	  		res.status(200).send(prepareResponse(response));	  		
  		}
	});
 
  }
};