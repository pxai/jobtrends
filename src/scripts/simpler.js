var request = require('request');
var fs = require('fs');
request( {
    // will be ignored 
    method: 'GET',
    uri: 'htp://www.infojobs.net', 
    encoding: 'windows-1252'
	},
	function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  		console.log('Ok,done');
	    	//console.log(body) // Show the HTML for the Google homepage. 
	    	fs.writeFile('/tmp/message.txt', body, function (err) {
	        if (err) throw err;
	          console.log('It\'s saved!' + body.length);
	          //function puts(error, stdout, stderr) { sys.puts(stdout) }
	          //exec("iconv", puts);
	        });
	  }
});
