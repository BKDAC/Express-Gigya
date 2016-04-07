
var config = require('./config.global');
 
config.env = 'development';
config.gigyaURL ='accounts.us1.gigya.com';
config.gigyaURLhttps = true;
config.APIKey = 'Add-your gigya Key here';
config.secret = 'Add-your gigya secret here';
config.port = 8000;
 
module.exports = config;