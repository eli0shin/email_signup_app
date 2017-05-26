var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var apiSchema = new Schema({	email : String});

module.exports = mongoose.model('email', apiSchema);
