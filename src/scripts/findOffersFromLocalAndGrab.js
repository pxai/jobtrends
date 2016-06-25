/**
* Grab all offers 
* from our local repo
* Then grab them from remote.
*/
var mongoose = require('mongoose');
var offers = require('../models/offer');
mongoose.connect('mongodb://127.0.0.1/jobtrends');
var Offer = mongoose.model('Offer');

// find each person with a last name matching 'Ghost'
var query = Offer.find({}).limit(10);

// selecting the `name` and `occupation` fields
query.select('url title');

// execute the query at a later time
query.exec(function (err, offer) {
  if (err) return console.log(err);
  offer.forEach(function(elem,i) {
	  if (i == undefined) { 
		console.log('finished');
		return;
	   }
	  console.log(elem.url + ':' + i); // Space Ghost is a talk show host.
  });

});