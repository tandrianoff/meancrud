var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var dbConfig = require('./config/db');
mongoose.connect(dbConfig.url);

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

// Database models
// TODO: This won't always be here. 
var Property = require('./models/property');

router.route('/property')

	// Post to create a property
	.post(function(req, res) {
		console.log("Creating a property");

		var property = new Property();
		property.sellerFirstName = req.body.sellerFirstName;
		property.sellerLastName = req.body.sellerLastName;
		property.price = req.body.price;
		property.available = req.body.available;

		property.save(function (err) {
			if (err) {
				res.send(err);
			}

			res.json({message: "Property created."});
		});
	})

	// Get to view all properties
	.get(function(req, res) {
		Property.find(function(err,properties) {
			if (err) {
				res.send(err);
			}

			res.json(properties)
		});
	});

// TODO: add id specific routes, other objects. Showing, agent, etc.

// All routes prefixed with /api
app.use('/api', router);

// server start
// ============================================================================
app.listen(port);
console.log('Server listening on port ' + port);