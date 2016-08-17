var request = require('request');
var fs = require('fs');


// USING REQUEST
request( {
    // will be ignored
    method: 'GET',
//    uri: 'http://www.infojobs.net/madrid/administracion-mantenimiento-cognos-datastage/of-i453f8f35124edca0679b160c5b1e5e',
    uri: 'http://www.infojobs.net/ofertas-trabajo/1',
    encoding: 'binary'
	},
	function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  		console.log('Ok,done');
	    	console.log(body) // Show the HTML for the Google homepage.
	    	/*fs.writeFile('/tmp/message.txt', body, function (err) {
	        if (err) throw err;
	          console.log('It\'s saved!' + body.length);
	          //function puts(error, stdout, stderr) { sys.puts(stdout) }
	          //exec("iconv", puts);
	        });*/
	  }
});
