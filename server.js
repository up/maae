// Create a node-static server instance 
// to serve the './public' folder

var static = require('node-static');
var http = require('http');

var file = new static.Server('./public');

http.createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(3000);

console.log("Server is listening on localhost:3000");
