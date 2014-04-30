var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('./');


require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        
        file.serve(request, response, function(e, r) {
            
            if(e){
                console.dir(e);
                response.writeHead(e.status, e.headers);
                response.end("error, bitch: " + e.status);
            }
            else{
                console.log(request.url + " - " + r.status);
            }
        });
    }).resume();
}).listen(8080);

console.log('starting http server');
