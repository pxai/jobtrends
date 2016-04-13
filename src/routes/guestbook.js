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
var GuestBook = mongoose.model('GuestBook');
var isloggedin = require('../middleware/isloggedin');
var sanitize = require('../helpers/sanitize.js');


module.exports = function (app) {

     /**
     * get
     * GETs all guestbook data.
     */
    app.get('/guestbook/', isloggedin, function (req, res) {
        var message = new GuestBook({
            name: '',
            age: '',
            message: ''
        });
        console.log(req.session);
        GuestBook.find({}, {}, {sort: {date: -1}}, function (err, data) {
            if (err) {
                res.send('{"msg":"No data","errors": {}}}');
                return;
            }
            console.log(data);
            res.render('guestbook.jade', {title: "Guestbook", message: message, messages: data, "errors": undefined});
        });
    });

    /**
     * post
     * saves a new guestbook message
     */
    app.post('/guestbook/', isloggedin ,function (req, res) {
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



    });

}