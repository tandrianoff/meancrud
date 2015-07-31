var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
	sellerFirstName: String,
	sellerLastName: String,
	price: Number,
	available: Boolean,
	listedDate: {type: Date, default: Date.now},
	shownDate: Date,
	shown: Boolean,
	images:  [{ type: Schema.Types.ObjectId, ref: 'PropertyImage' }]
});

module.exports = mongoose.model('Property', PropertySchema);