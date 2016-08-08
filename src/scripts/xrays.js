
var request = require('request');
var http = require('http');
var Xray = require('x-ray');
var x = Xray();

request( {
    // will be ignored
    method: 'GET',
    uri: 'https://www.infojobs.net/ofertas-trabajo/1' , //'http://www.infojobs.net',
    encoding: 'binary'
	},
	function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  		console.log('Ok, done:  ' + body);

        x(body,'ul > li',  [{
                a: 'h2 a@href',
                title: 'h2 a@title'
            }])(function(err, obj) {
            console.log(obj);
          });
    }
});


// USING HTTPREQUEST
http.get({
  hostname: 'www.infojobs.net',
  port: 80,
  path: '/ofertas-trabajo/1',
  agent: false  // create a new agent just for this one request
}, function(res) {
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

         //  html = cheerio.load(data);
          console.log(data);
          } catch (exception) {
            console.log(exception);
          }

      });// on end
});




/*x('http://www.infojobs.net/ofertas-trabajo/1', {
  title: 'title',
  items: x('h2.job-list-title', [{
    href: 'h2 a@href',
    title: 'h2 a@title'
  }])
})(function(err, obj) {
  console.log(title);
  console.log(obj.title);
});*/


  //x('http://www.infojobs.net/ofertas-trabajo/1','ul.job-list li',  [{

// Worked . Not for: http://www.infojobs.net/ofertas-trabajo/1
// Works:
//  x('http://localhost/ofertas.html','ul > li',  [{
// Works:
//  x('http://localhost/ofertas.html','li[itemtype="http://schema.org/JobPosting"]',  [{

// Works
//  x('<ul><li><h2>yea<a href="0"></h2></li><li><h2>yea<a href="0"></h2></li></ul>','ul > li',  [{
/*x('http://localhost/ofertas.html','ul > li',  [{
        a: 'h2 a@href',
        title: 'h2 a@title'
    }])(function(err, obj) {
    console.log(obj);
  });
*/

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
  /*
  // Works
    x('https://www.trabajos.com/','div.ofertadestacada',  [{
        title: 'p.oferta',
        a: 'p.oferta a@href'
      }]) (function(err, obj) {
      console.log(obj);
    });
    */
/*

var Xray = require('x-ray');
var x = Xray()


x('http://localhost/ofertas.html', {
  title: 'title',
  offers : x ( 'h2', [{
    title: 'a'
  }])
})(function(err, obj) {
  console.log(obj);
});

/*
x(html, '.job\-list', [{
  title: 'h2'
}])(console.log)*/
