var Xray = require('x-ray');
var x = Xray();
var mongoose = require('mongoose');
var proxies = require('../models/proxy');
var Proxy = mongoose.model('Proxy');
var exports = module.exports = {};

mongoose.connect('mongodb://localhost/jobtrends');

/*
// This works
x('http://google.com', 'title')(function(err, title) {
  console.log(title) // Google
});
*/
var total = 0;
var page = 1;
var urlSite = 'http://www.xroxy.com/proxylist.php?&pnum=';

/**
 * scraps one Page and get 20 items
 */
exports.scrapPage = function (page) {
     // Return a new promise.
     // https://developers.google.com/web/fundamentals/primers/promises/?hl=en
     // Followet XMLHttpRequest
  return new Promise(function(resolve, reject) {
        x(urlSite + page, 'body',{
            rows0: x('tr.row0', ['td']),
            rows1: x('tr.row1', ['td'])
           // port: 'h2.job-list-title a@title'
        })(function(err, obj) {
            console.log('Page: ' + page);

            var all = obj.rows0.concat(obj.rows1);
             console.log(all);
            var proxies = [];
            if (obj.rows0 != undefined && obj.rows1 != undefined) {
                for (var i = 0; i < all.length;i+=6) {

                    var proxyObject = {};
                    proxyObject.ip = all[++i].replace(/[\n]*$/g,'');
                    proxyObject.port = all[++i];
                    proxyObject.type = all[++i];  
                    console.log(' Saving proxy: ');
                    console.log(proxyObject);    

                    if (proxyObject.ip != '') {
                         proxies.push(proxyObject);
                    }              
                }
            } else {
              console.log('Obj void');
              console.log(obj);
            }

            // Resolve promise
            if (proxies.length > 0) {
                resolve(proxies);
            } else {
                reject(Error('Proxies not found in ' + urlSite + page));
            }
        });


  });
}
/**
 * saves an offer
 */
exports.saveProxy = function  (proxyObject) {

     return new Promise(function(resolve, reject) {

                var proxy = new Proxy({
                            ip:  proxyObject.ip,
                            port:  proxyObject.port,
                            type: proxyObject.type,
                            works: true
                        });

                console.log(proxyObject);

                    //    offer.save(function (err, offer) {
               Proxy.findOneAndUpdate({ip:proxyObject.ip},proxyObject,{upsert: true, 'new': true},function (err, proxy) {
               // offer.save(function (err, offer) {
                    if (err) {
                        reject(Error('proxies not found in ' + page));
                    } else {
                        console.log('Saving: ' + proxy);
                        resolve(proxy);
                    }
                });

     });
}


exports.inc = function (num) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
      var dl = Math.round(Math.random() * 1000);
      setTimeout(function () {
                console.log('--------Number is ' + num + '('+dl+')--------------------------');
                resolve(num + 1);
        }, dl);
  });

}


function saveProxies (proxies) {
   // promise.all is a builtin function
   console.log('Lets save proxies ' + proxies.length);
  return Promise.all(proxies.map(exports.saveProxy));
}
var len = 110;
var n = -1;

exports.inc(-1).then(function repeat(n) {
   console.log('Ok, number is: ' + n);
    if (n < len) {
        return exports.inc(n).then(exports.scrapPage(n).then(
                function (proxies) {
                    return saveProxies(proxies);
                }
        )).then(repeat);
    }
});
