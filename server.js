var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var dbConfig = require('./config/db');
mongoose.connect(dbConfig.url);

var port = process.env.PORT || 8080; // set our port

// configure app to use body-parser to get data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set the static files location
app.use(express.static(__dirname + '/public'));

var router = express.Router();

// example of middleware used for all requests
/*
router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});
*/

// test route
router.get('/', function(req, res) {
	res.json({message: 'welcome to the meancrud api'});
});

// api routes
//require('./routes/routes')(router); // configures routes in another file

// Database models
// TODO: Eventually move routes out to separate file(s)
var Property = require('./models/property');
var PropertyImage = require('./models/propertyImage');

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
		console.log("Fetching all properties...");
		Property.find(function(err,properties) {
			if (err) {
				res.send(err);
			}

			res.json(properties)
		});
	});

router.route('/property/:property_id')
	
	.get(function(req, res) {
		console.log('GET property ID '+req.params.property_id);
		Property.findById(req.params.property_id, function(err, property) {
			if (err) {
				res.send(err);
			}

			res.json(property);
		}); 
	})

	.put(function(req, res) {
		console.log('PUT property ID '+req.params.property_id);
		// console.log(req); // TODO: Why won't form-data work? It's empty in body
		Property.findById(req.params.property_id, function(err, property)  {
			if (err) {
				console.log(err);
				res.send(err);
			}

			if (req.body.sellerFirstName) {
				property.sellerFirstName = req.body.sellerFirstName;
			}

			if (req.body.sellerLastName) {
				property.sellerLastName = req.body.sellerLastName;
			}

			if (req.body.price) {
				property.price = req.body.price;
			}

			// TODO: Update more properties, dates
			property.save(function(err, product, numUpdated) {
				if (err) {
					console.log(err);
					res.send(err);
				}

				res.json({message:numUpdated+' Property updated.'})
			});
		});
	})

	.delete(function(req,res) {
		console.log('DELETE property ID '+req.params.property_id);
		Property.findByIdAndRemove(req.params.property_id, function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message:'Successfully removed'})
			}
		});
	});

// TODO: add other objects. Showing, agent, etc.

// All routes prefixed with /api
app.use('/api', router);

app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load public/index.html file
});

// server start
// ============================================================================
app.listen(port);
console.log('Server listening on port ' + port);