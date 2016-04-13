var http = require('http');
var querystring = require('querystring');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var offers = require('./models/offer');

var Offer = mongoose.model('Offer');

var infojobsPost = require('./crawler/parameters/infojobs');
var infojobsOptions = require('./crawler/options/infojobs');


var postData = querystring.stringify();
infojobsOptions.headers['Content-Length'] = postData.length;



var req = http.request(infojobsOptions, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  var links = [];
  var data = '';
  res.on('data', function (chunk) {
    data += chunk;
  });

  res.on('end',function (err) {
      html = cheerio.load(data);
      html('h2.result-list-title a').map(function (i, a) {
      console.log('A.['+ i +'] ' + cheerio(a).attr('href'));
      cheerio(a).attr('href');
      var offer = new Offer({
            url:  'http:'+cheerio(a).attr('href'),
            title:  cheerio(a).text()
        });

    /*http.get(offer.url, function(res) {
      console.log("Got response: " + res.statusCode);
    }).on('data', function(data) {
      console.log("Got data : " + data.length);
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
*/
      offer.save(function (err, offer) {
          if (err) {
              console.log('{"msg":"Message not saved"}');
              return;
          }
          console.log('Saving: ' + offer);
      });
  });//end
});

});
/*

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);

*/