var Xray = require('x-ray');
var x = Xray();
var mongoose = require('mongoose');
var offers = require('../models/offer');
var Offer = mongoose.model('Offer');
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
//var urlToScrap = 'http://www.infojobs.net/jobsearch/search-results/list.xhtml';

for (var page = 1; page < 4; page++) {
    x(urlSite + page, {
        items: x('.item', [{
        a: '.item a@href',
        job_title: '.item a'
    }])
    })(function(err, obj) {
        console.log('Page: ' + page);
        if (obj != undefined && obj.items != undefined) {
            for (var i = 0; i < obj.items.length;i++) {
                if (obj.items[i].a.indexOf(urlSite) == -1) {
                    console.log(obj.items[i].a + '->' + obj.items[i].job_title);
                    offer_id = obj.items[i].a.split("/")[5];
                    var offer = new Offer({
                        url:  obj.items[i].a,
                        title:  obj.items[i].job_title,
                        body: '',
                        date: Date.now()
                    });
                    
                console.log(offer);
                offer.save(function (err, offer) {
                    if (err) {
                        console.log('{"msg":"Offer not saved"}' + err);
                        return;
                    }
                    console.log('Saving: ' + offer);
                }); // save        
                }
            }
        }
    }); //.paginate('button#pageNext@href').limit(3);
}

var html = 'http://www.infojobs.net/jobsearch/search-results/list.xhtml';
//x(html, ['a@href'])(console.log)

//}).paginate('button#pageNext@href').limit(3)