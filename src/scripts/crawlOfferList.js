
var http = require('http');
var querystring = require('querystring');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var offers = require('../models/offer');
var finished = false;
var Offer = mongoose.model('Offer');

var infojobsPost = require('../crawler/parameters/infojobs');
var infojobsOptions = require('../crawler/options/infojobs');
var i = 1;

function makeRequest (page) {

  infojobsPost['inicio'] = page;
  var postData = querystring.stringify(infojobsPost);

  var options = infojobsOptions;

  options.headers['Content-Length'] = postData.length;


  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('binary');

    var data = '';
    res.on('data', function (chunk) {
      process.stdout.write('Downloading:' + chunk.length+ '\r');
      data += chunk;
    });

    res.on('end', function (err) {
          console.log('Ended: ' + data.length);
          try {
            html = cheerio.load(data);
            } catch (exception) {
              console.log(exception);
            }
            html('h2.result-list-title a').map(function (i, a) {
              console.log('A.['+ i +'] ' + cheerio(a).attr('href'));
              var offer = new Offer({
                      url:  'http:'+cheerio(a).attr('href'),
                      title:  cheerio(a).text(),
                      body: '',
                      date: Date.now()
                });
              //console.log(offer);
              offer.save(function (err, offer) {
                 if (err) {
                    console.log('{"msg":"Message not saved"}' + err);
                    return;
                  }
                  console.log('Saving: ' + offer);
              }); // save
	     makeRequest(++i);
           }); // map
        });// on end
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(postData);
  req.end();

}

makeRequest(i);

/*for (var i=1;i<40;i++) {
  makeRequest(i);
}*/


/*var postData = querystring.stringify(infojobsPost);
var options = infojobsOptions;

options['Content-Length'] = postData.length;

var req = http.request(options, processPage(res));

// write data to request body
req.write(postData);

function processPage(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
      process.stdout.write('Downloading:' + chunk.length+ '\r');
      data += chunk;
    });

    res.on('end', function (err) {
      console.log('Ended: ' + data.length);
      html = cheerio.load(data);
      html('h2.result-list-title a').map(function (i, a) {
        console.log('A.['+ i +'] ' + cheerio(a).attr('href'));
        var offer = new Offer({
                url:  'http:'+cheerio(a).attr('href'),
                title:  cheerio(a).text()
          });
        console.log(offer);
       }); // map
    });// on end

  }
  ).on('error', function(e) {
    console.log('problem with request: ' + e.message);
  }).end();
*/


//mongoose.disconnect();
