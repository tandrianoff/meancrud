var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var dbConfig = require('./config/db');
mongoose.connect(dbConfig.url);

// Database models
var Property = require('./models/property');

// configure app to use body-parser to get data from a POST
app.use(bodyParser.urlencoded({externded: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var router = express.Router();

// middleware used for all requests
router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

// test route
router.get('/', function(req, res) {
	res.json({message: 'welcome to the meancrud api'});
});

// api routes
//require('./routes/routes')(router); // configures routes in another file

// All routes prefixed with /api
app.use('/api', router);

// server start
// ============================================================================
app.listen(port);
console.log('Server listening on port ' + port);