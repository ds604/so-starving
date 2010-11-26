var http = require('http');
var fs = require('fs');
var mustache = require('./lib/mustache');

var server = http.createServer();
server.listen(8000, 'localhost');

var fb = http.createClient(80, 'graph.facebook.com');

server.on('request', function(request, response) {
  var fbRequest = fb.request('GET', '/search/?q=so%20starving&type=post',
			     {'host': 'graph.facebook.com'});

  fbRequest.on('response', function(fbResponse){ 
    if (fbResponse.statusCode == 200) {
      var fbJSON = "";
      fbResponse.on('data', function(chunk) { 
	fbJSON += chunk.toString('utf-8');
      });
      fbResponse.on('end', function() { 
        var jsonResp = JSON.parse(fbJSON);
        fs.readFile('./index.html.tmpl', 'utf-8', function(err, data) { 
	  var html = mustache.to_html(data, {"data": jsonResp['data']});
	  response.writeHead(200, {
	    'Content-Length': html.length,
	    'Content-Type': 'text/html'
	});
	response.write(html);
        response.end();
        });
      });
    }
  });
  fbRequest.end();	      
});
