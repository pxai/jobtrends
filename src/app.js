/**
* app.js
* Main entrypoint for the app
* https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
*/
var express = require('express');
var config = require('config');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var i18next = require('i18next');
var mongoose = require('mongoose');

i18next.init();

// read them synchronously!
/*i18next.init({ getAsync: false , lng: 'es-ES',fallbackLng: 'es-ES' ,preload: ['en-US', 'es-ES'],debug: true},function(t) {
    console.log('Loaded resources ');
    console.log('Lang:' + i18next.lng() +', App name' + i18next.t("app.name"));
})*/;


var models = require('./models');
var routes = require('./routes');
var middleware = require('./middleware');


var app = express();

// i18n
app.use(i18next.handle);
i18next.registerAppHelper(app)

// If we want to use post data:
app.use(bodyParser({extended: true}));


// For session data:
app.use(expressSession({secret: 'tannedkrab',
            resave: true,
            saveUninitialized: true,
            key: 'session',
            store: require('mongoose-session')(mongoose)}) );

// We set middleware
middleware(app);

// We set routes
routes(app);

// We set static content
app.use(express.static('public'));
config.port = process.env.PORT || config.port || 3000;
console.log(config);
// And there we go, listening on port 3000
app.listen(config.port, function () {
    console.log('now listening on http://localhost:' + config.port);
});
