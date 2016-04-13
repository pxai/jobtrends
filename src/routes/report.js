/**
 * routes/guestbook.js
 * The router for guestbook operations.
 * Keep in mind that here '/' refers to '/guestbook/'
 * All operations apply isloggedin middleware to make
 * sure that the user is properly logged to use the guestbook.
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */

var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var isloggedin = require('../middleware/isloggedin');
var sanitize = require('../helpers/sanitize.js');


module.exports = function (app) {

     /**
     * get
     * GETs all guestbook data.
     */
    app.get('/api/reports/autonomy', function (req, res) {
           Offer.aggregate(
             { $match : { country : {$regex: /Espa/}} },
             { $project : { community : 1, country: 1, _id : 0 } },
              { $group : {
                _id:'$community',
                count: {$sum: 1}
               } },
               { $sort : { count : -1} },
               function (err, result) {
                    //var data = {'autonomies': ['Madrid', 'Cataluñarg', 'Euskadi', 'Cantabria', 'Nafarroa', 'Andalucía', 'Asturias'],'data' : [[265, 659, 380, 381, 256, 155, 340]]  };
                    var formatted = { 'autonomies' : [], 'data':[[]]};
                    console.log(result);
                    result.forEach(function (elem, i) {
                        formatted.autonomies.push(elem._id);
                        formatted.data[0].push(elem.count);          
                    });

                    res.send(formatted);
               });
         
    });
    
    
      /**
     * get
     * GETs all guestbook data.
     */
    app.get('/api/reports/study', function (req, res) {
           Offer.aggregate(
             { $match : { country : {$regex: /Espa/}} },
             { $project : { studies : 1, country: 1, _id : 0 } },
              { $group : {
                _id:'$studies',
                count: {$sum: 1}
               } },
               { $sort : { count : -1} },
               {$limit : 20},
               function (err, result) {
                    var formatted = { 'studies' : [], 'data':[[]]};
                    console.log(result);
                    result.forEach(function (elem, i) {
                        formatted.studies.push(elem._id);
                        formatted.data[0].push(elem.count);          
                    });

                    res.send(formatted);
               });
         
    });
    
      /**
     * get
     * GETs all guestbook data.
     */
    app.get('/api/reports/category', function (req, res) {
            Offer.aggregate(
             { $match : { country : {$regex: /Espa/}} },
             { $project : { category : 1, country: 1, _id : 0 } },
              { $group : {
                _id:'$category',
                count: {$sum: 1}
               } },
               { $sort : { count : -1} },
               function (err, result) {
                    //var data = {'autonomies': ['Madrid', 'Cataluñarg', 'Euskadi', 'Cantabria', 'Nafarroa', 'Andalucía', 'Asturias'],'data' : [[265, 659, 380, 381, 256, 155, 340]]  };
                    var formatted = { 'category' : [], 'data':[[]]};
                    result.forEach(function (elem, i) {
                        formatted.category.push(elem._id);
                        formatted.data[0].push(elem.count);          
                        //console.log(elem);
                    });
                    res.send(formatted);
               });
         
    });

      /**
     * get
     * GETs all subcategory data.
     */
    app.get('/api/reports/subcategory', function (req, res) {
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
                    //console.log(formatted);
                    res.send(formatted);
               });
         
    });
    
     /**
     * db.offer.aggregate([ {$match: {country: {$regex:/Espa/}}},{$group: { _id:{subcategory:"$subcategory"}, category: {$addToSet:"$category"}, count: {$sum:1} }},{$project : {_id: "$_id", count:"$count",category:"$category"}} ,{$sort: {count:-1}} ]);
     * get db.offer.aggregate([ {$match: {country: {$regex:/Espa/}}},{$group: { _id:{subcategory:"$subcategory"}, count: {$sum:1} }},{$sort: {category:-1}} ]);
     * GETs all subcategory data.
     */
    app.get('/api/reports/sector/:nameSector', function (req, res) {
            var nameSector = req.param('nameSector');
           Offer.aggregate(
             {$match: {country: {$regex:/Espa/}}},
             {$group: { _id:{subcategory:"$subcategory"}, 
             category: {$addToSet:"$category"}, count: {$sum:1} }},
             {$project : {_id: "$_id", count:"$count",category:"$category"}} ,
             {$sort: {category:-1}},
               function (err, result) {
                   //[{'category':'A','labels':['L1','L2','L3'],'data':[45,67,24]}];
                    //var data = {'autonomies': ['Madrid', 'Cataluñarg', 'Euskadi', 'Cantabria', 'Nafarroa', 'Andalucía', 'Asturias'],'data' : [[265, 659, 380, 381, 256, 155, 340]]  };
                    var formatted = [];
                    var previous = '';
                    var c = -1;
                    result.forEach(function (elem, i) {
                        if (previous != elem.category[0]) {
                            previous = elem.category[0];
                            c++;
                            formatted[c] = {'category':elem.category[0], 'labels':[], 'data':[]}
                        }
                        
                        formatted[c].labels.push(elem._id.subcategory);
                        formatted[c].data.push(elem.count);          
                        //console.log(elem);
                    });
                    //console.log('data received.');
                    //console.log(result);
                    console.log('Sector: ' + nameSector);
                    res.send(formatted);
               });
         
    });
   
   /**
    * db.offer.aggregate([ {$match: {country: {$regex:/Espa/}}},{$unwind:'$skills'},{$group: { _id:{ skills:"$skills", category:"$category"}, count: {$sum:1}}},{$sort: {count:-1, category:-1}},{$limit: 30} ]);
    * db.offer.aggregate([ {$match: {country: {$regex:/Espa/}}},{$unwind:'$skills'},{$group: { _id:{ skills:"$skills", category:"$category"}, count: {$sum:1}}},{$sort: {count:-1, category:-1}} ])
    * Better approach: db.offer.aggregate([ {$match: {country: {$regex:/Espa/} }},{$unwind:'$skills'},                {$group: { _id:{ skills:"$skills", category:"$category"}, count: {$sum:1}}},                    { $group: {_id: {category:"$_id.category", labels: "$_id.skills", data: "$count" }} }, {$sort : {"_id.category":1, "data":-1}} 
    */
    app.get('/api/reports/skill/:nameSector', function (req, res) {
            var nameSector = req.param('nameSector');
           Offer.aggregate(
               {$match: {country: {$regex:/Espa/}}},{$unwind:'$skills'},
               {$group: { _id:{ skills:"$skills", category:"$category"}, count: {$sum:1}}},
               {$sort: {count:-1}}, 
               { $group: {_id: "$_id.category", labels: {$addToSet: "$_id.skills"}, data: {$push: "$count"} } }
               ,
               function (err, result) {
                    var formatted = [];
                    var c = 0;
                    result.forEach(function (elem, i) {
                        formatted[c] = {category:'', labels:[], data: []}
                        formatted[c].category = elem._id;
                        formatted[c].labels = elem.labels;
                        formatted[c].data[0] = elem.data;
                        c++;
                    });
                    res.send(formatted);
               });
         
    });
//   db.offer.aggregate([ {$match: {country: {$regex:/Espa/}}},{$unwind:'$skills'},{$group: { _id:"$skills",count: {$sum:1} }},{$sort: {count:-1}},{$limit: 30} ]);


}