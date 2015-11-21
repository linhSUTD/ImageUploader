/**
 * Created by nguyenlinh on 11/20/15.
 */

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	name: String,
	description: String,
	path: String
});

module.exports = mongoose.model('Image', imageSchema);
