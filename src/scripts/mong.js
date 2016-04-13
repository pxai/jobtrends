var mongoose = require('mongoose');
var offers = require('../models/offer');
mongoose.connect('mongodb://127.0.0.1/jobtrends');
var Offer = mongoose.model('Offer');

// find each person with a last name matching 'Ghost'
//var query = Offer.find({}).limit(10);

// selecting the `name` and `occupation` fields
//query.select('url title');

// execute the query at a later time
/*query.exec(function (err, offer) {
  if (err) return console.log(err);
  offer.forEach(function(elem,i) {
	  if (i == undefined) { 
		console.log('finished');
		return;
	   }
	  console.log(elem.url + ':' + i); // Space Ghost is a talk show host.
  });

});*/
//  db.offer.aggregate([ {$match: {country: {$regex:/Espa/}}},{$group: { _id: {province:"$province", country:"$country"},count: {$sum:1} }} ]
 Offer.aggregate(
             { $match : { country : {$regex: /Espa/}} },
             { $project : { subcategory : 1, category:1, country: 1, _id : 0 } },
              { $group : {
                _id: {subcategory:'$subcategory',category:'$category'},
                count: {$sum: 1}
               } },
               { $sort : { count : -1} },
               {$limit: 20},
               function (err, result) {
                    //var data = {'autonomies': ['Madrid', 'Cataluñarg', 'Euskadi', 'Cantabria', 'Nafarroa', 'Andalucía', 'Asturias'],'data' : [[265, 659, 380, 381, 256, 155, 340]]  };
                    var formatted = { 'subcategory' : [], 'data':[[]]};
                    result.forEach(function (elem, i) {
                        formatted.subcategory.push(elem._id.category+': '+elem._id.subcategory);
                        formatted.data[0].push(elem.count);          
                        //console.log(elem);
                    });
                    //console.log('data received.');
                    //console.log(result);
                    console.log(formatted);
                    //res.send(formatted);
               });


