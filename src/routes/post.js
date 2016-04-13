/**
 * routes/post.js
 * The router for blog-post operations.
 * Keep in mind that here '/' refers to '/blog/'
 * All operations apply isloggedin middleware to make
 * sure that the user is properly logged to use the blog.
 * Based on https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var isloggedin = require('../middleware/isloggedin');
var sanitize = require('../helpers/sanitize.js');


module.exports = function (app) {

     /**
     * get
     * GETs all guestbook data.
     */
    app.get('/blog/', function (req, res) {
        var post = new Post({
            title: '',
            body: '',
            author: '',
            date: ''
        });
        console.log(req.session); // sort: {date: -1}
        Post.find({}, {},{'limit': 10}, function (err, data) {
            if (err) {
                res.send('{"msg":"No data","errors": {}}}');
                return;
            }
            //res.send('sending data...');
            console.log('requested post');
            res.send(data);
            //res.render('guestbook.jade', {title: "Guestbook", message: message, messages: data, "errors": undefined});
        });
    });

    app.get('/blog/:permalink', function (req, res) {
        var permalink = req.param('permalink');

        var post = new Post({
            title: '',
            body: '',
            author: '',
            date: ''
        });
        console.log(req.session); // sort: {date: -1}
        Post.findOne({'permalink': permalink}, function (err, data) {
            if (err) {
                res.send('{"msg":"No data for "' + permalink +'","errors": {}}}');
                return;
            }
            //res.send('sending data...');
            console.log('requested post ' + permalink);
            res.send(data);
            //res.render('guestbook.jade', {title: "Guestbook", message: message, messages: data, "errors": undefined});
        });
    });

    app.get('/blog/tag/:tag', function (req, res) {
        var tag = req.param('tag');
        var criteria = {'$in' : {'tags': tag}};
        Post.find(criteria, {},{'limit': 10},function (err, data) {
            if (err) {
                res.send('{"msg":"No data for "' + permalink +'","errors": {}}}');
                return;
            }
            //res.send('sending data...');
            console.log('requested post ' + permalink);
            res.send(data);
            //res.render('guestbook.jade', {title: "Guestbook", message: message, messages: data, "errors": undefined});
        });
    });

    app.post('/blog/search/', function (req, res) {
        var searchTerm = sanitize(req.body.searchTerm);
        var criteria = {'$or' : {'body': searchTerm, 'title': searchTerm}};
        console.log(req.session); // sort: {date: -1}
        Post.findOne(criteria,{},{'limit': 10}, function (err, data) {
            if (err) {
                res.send('{"msg":"No data for "' + permalink +'","errors": {}}}');
                return;
            }
            //res.send('sending data...');
            console.log('requested post ' + permalink);
            res.send(data);
            //res.render('guestbook.jade', {title: "Guestbook", message: message, messages: data, "errors": undefined});
        });
    });
    
    /**
     * post
     * saves a new guestbook message
     */
    /*app.post('/blog/', isloggedin ,function (req, res) {
        var message = new GuestBook({
            name: sanitize(req.body.name),
            age: sanitize(req.body.age),
            message: sanitize(req.body.message)
        });
        message.validate(function (err) {
            if (err) {
                console.log(err);
                console.log('Validation error! : ' + String(err)) // ValidationError: The value of path `n` (4) is beneath the limit (10).
                res.render('guestbook.jade', {title: "Guestbook", message: message, messages: "", "errors": err});
            } else {
                message.save(function (err, message) {
                    if (err) {
                        res.send('{"msg":"Message not saved"}');
                        return;
                    }
                    console.log('Saving: ' + message);
                    res.redirect('/guestbook/');
                });
            }
        });
    


    });*/

}