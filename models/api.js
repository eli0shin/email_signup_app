var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EMAIL = new Schema({
	email : String
});

module.exports = mongoose.model('email', EMAIL);