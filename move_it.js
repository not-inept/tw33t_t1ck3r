var ncp = require('ncp').ncp;
ncp.limit = 16;
var source = './';
var destination = '../../'
ncp(source, destination, function (err) {
 if (err) {
   return console.error(err);
 }
});