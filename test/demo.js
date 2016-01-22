
var proxy = require('../proxy.js');

var host = 'localhost';
var port = 8888;
var ipWhitelist = ["127.0.0.1", "8.8.8.8"];

proxy(host, port, ipWhitelist);