/**
 * routes/session.js
 * The router for session operations: signin, signup, signout
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */


module.exports = function (app) {


     var err = {};

     /**
     * get
     * GETs signin page.
     */
    app.get('/session/signin', function (req, res) {
            console.log(req.session);
            res.render('login.jade', {title: "Guestbook", err: err});
    });

    /**
     * post
     * signs in application
     */
    app.post('/session/signin', function (req, res) {
        var login = req.body.login;
        var password = req.body.password;
        var session = req.session;
        console.log(session);
        console.log('Login as: ' + login + ' with ' + password);
        session.login = '';
        if (login === 'falken' && password === 'josua' ) {
            console.log('Login correct ' + login);
            // two ways to store data...
            req.session.login = login;
            req.session['name'] = login;
            res.redirect('/guestbook/');
        } else {
            err.msg = 'Login INcorrect'
            res.render('login.jade', {title: "Guestbook", err: err});
        }

    });

    /**
     * get
     * exits app
     */
    app.get('/session/signout', function (req, res) {
        req.session.login = ''
        //req.session.destroy(); // makes mongoose-session fail
        res.redirect('/');
    });
};