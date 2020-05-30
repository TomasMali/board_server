

const http = require('http');

const app = require('./app')

const port = process.env.PORT || 3008


const server = http.createServer(app);

server.listen(port)




/*


var fs = require('fs')
var app = require('./app');
var port = process.env.PORT || process.env.VCAP_APP_PORT || 3008;
var https = require('https');


var options = {
key: fs.readFileSync('./key.pem'),
cert: fs.readFileSync('./cert.pem')
};

https.createServer(options, app).listen(port);

*/