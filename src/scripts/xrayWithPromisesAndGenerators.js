var Xray = require('x-ray');
var x = Xray();
var mongoose = require('mongoose');
var offers = require('../models/offer');
var Offer = mongoose.model('Offer');
var exports = module.exports = {};

//mongoose.connect('mongodb://localhost/jobtrends');

/*
// This works
x('http://google.com', 'title')(function(err, title) {
  console.log(title) // Google 
});
*/
var total = 0;
var page = 1;
var urlSite = 'http://www.infojobs.net/ofertas-trabajo/';

/**
 * scraps one Page and get 20 items
 */
exports.scrapPage = function (page) {
     // Return a new promise.
     // https://developers.google.com/web/fundamentals/primers/promises/?hl=en
     // Followet XMLHttpRequest
  return new Promise(function(resolve, reject) {      
        x(urlSite + page, {
            items: x('.item', [{
            a: '.item a@href',
            job_title: '.item a'
        }])
        })(function(err, obj) {
            console.log('Page: ' + page);
            var offers = [];
            if (obj != undefined && obj.items != undefined) {
                for (var i = 0; i < obj.items.length;i++) {
                    if (obj.items[i].a.indexOf(urlSite) == -1) {
                        console.log(obj.items[i].a + '->' + obj.items[i].job_title);
                        offers.push(obj.items[i]);
                    }
                }
            }
            
            // Resolve promise
            if (offers.length > 0) {
                resolve(offers);
            } else {
                reject(Error('Offers not found in ' + urlSite + page));
            }
        });
        
        
  });
}

exports.delay = function (offers, page) {
     return new Promise(function(resolve, reject) {
         setTimeout(function () {
                console.log('Introduce delay in ' + page);
                return resolve(offers);
            }, Math.random() * 1000);
     });    
}

/**
 * saves an offer
 */
exports.saveOffer = function  (offerObject) {
    
     return new Promise(function(resolve, reject) {

                var offer = new Offer({
                            url:  offerObject.a,
                            title:  offerObject.job_title,
                            body: '',
                            date: Date.now()
                        });
             
                console.log(offerObject);
                
                    //    offer.save(function (err, offer) {                
                offer.save(function (err, offer) {                
                    if (err) {
                        reject(Error('Offers not found in ' + page));
                    } else {
                        console.log('Saving: ' + offer);
                        resolve(offer);
                    }
                });         
              
     });
}

function* nextPage(){
  for (var i = 1; i < 4010; i++) {
      // This is stops the execution
    yield i
  }
}

for (var j of nextPage()) {
  console.log(j);
    exports.delay(offers, j).then(exports.scrapPage(j).then(function (offers) {
            console.log('Ok, scrapped ' + j);
            //return exports.saveOffer(offers[0]);
        }
        , function(error) {
        console.error("Failed!", error);
        }).then(console.log('done'))
    );
}

/*
exports.scrapPage(1).then(function (offers) {
    return exports.saveOffer(offers[0]);
}
, function(error) {
  console.error("Failed!", error);
}).then(console.log('done'));
*/
//offers = scrapPage();
//console.log(offers.length);
//saveOffer(obj.items[i]);



