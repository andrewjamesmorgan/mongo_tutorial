var MongoClient = require('./node_modules/mongodb').MongoClient;
var ObjectId = require('./node_modules/mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find({ $or: [{cuisine: "Italian"}, {"address.zipcode": "10075"}]}).sort({cuisine : 1, name : 1});
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	findRestaurants(db, function() {
		db.close();
	});
});