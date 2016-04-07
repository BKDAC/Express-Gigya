
var config = require('./config.global');
 
config.env = 'staging';
config.gigyaURL ='accounts.us1.gigya.com';
config.gigyaURLhttps = true;
config.APIKey ='Add-your gigya Key here';
config.secret = 'Add your gigya Secret here';
config.port = 8080;
 
module.exports = config;