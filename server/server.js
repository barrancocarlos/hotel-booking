// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var cors = require('cors');
    var config = require('./config/config');

// Db connect =================
require('./config/database');

// configuration =================

    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride('_method'));               // put and delete
    app.use(cors());
    //app.use(express.static(__dirname + '/public'));

// routes =========================

require('./routes/api')(app);

// Port ======================================================================
app.listen(config.port);
console.log("Running at " + config.port);
console.log(process.env.NODE_ENV);
