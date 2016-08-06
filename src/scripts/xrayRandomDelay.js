var Xray = require('x-ray');
var x = Xray();
var mongoose = require('mongoose');
var offers = require('../models/offer');
var Offer = mongoose.model('Offer');
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
            items: x('.lines-2', [{
            a: '.lines-2 a@href',
            job_title: '.lines-2 a@title'
        }])
        })(function(err, obj) {
            console.log('Page: ' + page);
                          console.log(obj);
            var offers = [];
            if (obj != undefined && obj.items != undefined) {
                for (var i = 0; i < obj.items.length;i++) {
                    if (obj.items[i].a.indexOf(urlSite) == -1) {
                        console.log('db.offer.insert({url:\''+obj.items[i].a + '\', title:\'' + obj.items[i].job_title+'\'})');
                        offers.push(obj.items[i]);
                    }
                }
            } else {
              console.log('Obj void');
              console.log(obj);
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
               Offer.findOneAndUpdate({url:offerObject.a},offerObject,{upsert: true, 'new': true},function (err, offer) {
               // offer.save(function (err, offer) {
                    if (err) {
                        reject(Error('Offers not found in ' + page));
                    } else {
                        console.log('Saving: ' + offer);
                        resolve(offer);
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


function saveOffers (offers) {
   // promise.all is a builtin function
   console.log('Lets save offers ' + offers.length);
  return Promise.all(offers.map(exports.saveOffer));
}
var len = 20;
var n = 0;

exports.inc(0).then(function repeat(n) {
   console.log('Ok, number is: ' + n);
    if (n < len) {
        return exports.inc(n).then(exports.scrapPage(n).then(
                function (offers) {
                    return saveOffers(offers);
                }
        )).then(repeat);
    }
});
