var mongoose = require('mongoose');
var offers = require('../../models/offer');
mongoose.connect('mongodb://127.0.0.1/jobtrends');
var Offer = mongoose.model('Offer');

// If it doesn't work try from the project root
// export PATH=${PATH}:node_modules/.bin
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var browser = new webdriver.Builder()
    .forBrowser('firefox')  // Works executed from project root
//    .forBrowser('firefox') // https://github.com/mozilla/geckodriver/releases
    .build();

var page = process.argv[2] || 1;
console.log('Processing page ' + page);

browser.get('http://www.infojobs.net/ofertas-trabajo/' + page);


browser.wait(until.elementsLocated(webdriver.By.css('h2.job-list-title a'))).then(function (res) {
        return Promise.all(res.map(log)).then(elements => {
            return Promise.all(elements.map(exports.saveOffer)).then(
                e => { mongoose.disconnect(); }
            );
        }
    ).then(console.log('Done here...')).then(browser.quit());
});

//browser.wait(until.titleIs('Ofertas de trabajo, Buscar trabajo, Bolsa de trabajo - Infojobs'), 1000);

//console.log(title);
console.log('-------------------');

function log (element) {
  // Return a new promise.
  return element.getAttribute('href');
}

exports.saveOffer = function  (offerUrl) {

     return new Promise(function(resolve, reject) {

                var offer = new Offer({
                            url:  offerUrl,
                            title:  offerUrl,
                            body: '',
                            date: Date.now()
                        });

                console.log(offerUrl);

                    //    offer.save(function (err, offer) {
               Offer.findOneAndUpdate({url:offerUrl},offer,{upsert: true, 'new': true},function (err, offer) {
               // offer.save(function (err, offer) {
                    if (err) {
                        //reject(console.log('Offers not found in ' + page));
                        return resolve(offer);
                    } else {
                        console.log('Saving: ' + offer);
                        return resolve(offer);
                    }
                });

     });
}
