/**
 * routes/index.js
 * All routes are here to import all of them just with one command
 * in the main app.js
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */

var home = require('./home');
var guestbook = require('./guestbook');
var session = require('./session');
var post = require('./post');
var report = require('./report');
var headers = require('./headers');

module.exports = function (app) {
    home(app);
    report(app);
    guestbook(app);
    post(app);
    session(app);
    headers(app);
}
