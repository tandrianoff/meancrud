var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertyImageSchema = new Schema({
	image: Buffer
});

module.exports = mongoose.model('PropertyImage', PropertyImageSchema);