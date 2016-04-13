/**
 * routes/headers.js
 * API to fetch data for headers such as keywords, description,...
 * Based on https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */

var config = require('config');
//var Post = mongoose.model('Post');

module.exports = function (app) {

     /**
     * get
     * GETs all headers data.
     */
    app.get('/headers/', function (req, res) {
        var headers = {
            title: 'pello.io from Node.JS',
            description: 'Personal playground site for Node.JS, MongoDB and javascript apps',
            keyword: 'Node.js, MongoDB,  Javascript, web development',
            author: 'Pello Xabier Altadill Izura'
        };
        console.log('requesting headers data'); // sort: {date: -1}
        res.send(headers);
    });



}