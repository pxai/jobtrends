var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var exec = require('child_process').exec;

var infojobsPost = require('../crawler/parameters/infojobs');
var infojobsOptions = require('../crawler/options/infojobs');

function makeRequest () {

  var postData = querystring.stringify(infojobsPost);

  var options = infojobsOptions;

  options.headers['Content-Length'] = postData.length;

  var data = '';
  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    //res.setEncoding('iso-8859-1');
    res.on('data', function (chunk) {
      data += chunk;
      console.log('BODY: ' + chunk);
    });
    res.on('end', function (err) {
      console.log('ENDED: ');
      fs.writeFile('/tmp/message.txt', data, function (err) {
        if (err) throw err;
          console.log('It\'s saved!' + data.length);
          //function puts(error, stdout, stderr) { sys.puts(stdout) }
          //exec("iconv", puts);
        });
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(postData);
  req.end();

}

makeRequest();