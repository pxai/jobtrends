var mongoose = require('mongoose');
var offers = require('../models/offer');
mongoose.connect('mongodb://127.0.0.1/jobtrends');
var Offer = mongoose.model('Offer');


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
                    if (err) {
                        reject(Error('Offers not found in ' + page));
                    } else {
                        console.log('Saving: ' + offer);
                        resolve(offer);
                    }
                });              
     });
}

var url = 'http://www.infojobs.net/barcelona/fiscalista-h-m/of-i3261eb70ab4f68a2ba4084980c584e';
var offerObject = {a : url, title: 'Fiscalista (h/m)'};

exports.saveOffer(offerObject).then(function (offer) {
    console.log('Offer saved ' + offer);
}, function(error) {
  console.error("Failed!", error);
}).then(function () {
    mongoose.connection.close();
    console.log('done')
});