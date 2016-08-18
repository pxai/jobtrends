// checkout: https://github.com/lapwinglabs/x-ray
var http = require('http');
var cheerio = require('cheerio');
var infojobsFields = require('./infojobsFields');
var job = require('./jobOffer');
var mongoose = require('mongoose');
var offers = require('../models/offer');
var OfferModel = mongoose.model('Offer');
mongoose.connect('mongodb://127.0.0.1/jobtrends');
var id = 1;
var descending = id;

    // Offer.find({'position':null}, {},{}, function (err, offer) {
     OfferModel.find({'position':null}, function (err, allOffers) {
            if (err) {
                console.err('{"msg":"No data","errors": {}}}');
                return;
            }

            allOffers.forEach(function (oneOffer, i) {

              //continue;
              http.get(oneOffer.url,function(res) {

                  var offer = new job.JobOffer('infojobs');
                  console.log("Got response: " + res.statusCode + oneOffer.url);
                  var content;
                  res.setEncoding('binary');

                  res.on('data', function (data) {
                    content += data;
                    process.stdout.write('Downloading for '+ oneOffer._id + ':' + content.length + ' bytes\r');
                  });

                  res.on('end', function (data) {
                    try {
                        console.log(content);
                      var html = cheerio.load(content);
                    } catch (ex) {
                        console.log(ex);
                        return;
                    }
                    console.log('ended request.' + oneOffer.url);
                    var offerModel = new OfferModel({
                                  'url': oneOffer.url,
                                  title: '',
                                  body: '',
                                  date: '',
                                  website:'',
                                  position: '',
                                  city:'',
                                  province: '',
                                  country: '',
                                  employerName: '',
                                  employerLogo: '',
                                  salary: '',
                                  experience: '',
                                  timetable: '',
                                  description: '',
                                  reference: '',
                                  category: '',
                                  subcategory: '',
                                  level: '',
                                  employees: '',
                                  vacancy: '',
                                  studies: '',
                                  experienceRequirements: '',
                                  skills: '',
                                  industrySector: ''
                              });

                      Object.keys(infojobsFields).forEach(function(key) {
                        var value = infojobsFields[key];

                      switch (value.type) {
                        case 'text':
                                  //console.log(key +': ' + html(value.selector).text());
                                  offer[key] = html(value.selector).text();
                                  offerModel[key] = html(value.selector).text();
                                  break;
                        case 'array':
                                  var elements = [];

                                  html(value.selector).each(function(i, elem) {
                                    elements[i] = html(this).text();
                                  });
                                  //console.log(key +': ' + elements);
                                  offer[key] = elements;
                                  offerModel[key] = elements;
                                  //console.log(key +': ' + html(value.selector));
                                  break;
                        case 'unspecified':
                                  //console.log(key +': ');
                                  //console.log(html( value.title ).next(value.selector).text());
                                  offer[key] = html( value.title ).next(value.selector).text();
                                  offerModel[key] = html( value.title ).next(value.selector).text();
                                  break;
                        default: break;
                      }

                    });
//                      console.log(offer );
                      console.log(offerModel);
		      //offerModel = offerModel.toString();

	                offerModel = offerModel.toObject();
	                delete offerModel._id;

                      console.log(oneOffer._id + ': ' + oneOffer.url);
                      var query = {'_id': oneOffer._id};
                      OfferModel.update(query, offerModel,{}, function (err) {
                          if (err) { console.log('Error updating:' + err);}
                          console.log('UPDATED ' + descending);
			  descending--;
			  if (descending <= 0) {
				console.log('We are done here');
				process.exit(0);
			  }
                      });
                  });
                }).on('error', function(e) {
                  console.log("Got error: " + e.message);
                });

            }); // forEach
            //return;
     }).limit(id);
/*
return;
var url = 'http://www.infojobs.net/madrid/dba-oracle12-rac-sql-server-2008/of-idd943e9707488b9c07dd4ccf9cd952';


*/
