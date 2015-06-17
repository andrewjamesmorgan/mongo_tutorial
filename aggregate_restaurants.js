var MongoClient = require('./node_modules/mongodb').MongoClient;
var ObjectId = require('./node_modules/mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
/*
var aggregateRestaurants = function(db, callback) {
	db.collection('restaurants').aggregate(
		[{$group: {"_id": "$borough", "count": {$sum: 1}}}]
		).toArray(function(err, result) {
			assert.equal(err, null);
			console.log(result);
			callback(result);
		});
};
*/

var aggregateRestaurants = function(db, callback) {
	db.collection('restaurants').aggregate(
		[
		{$match: {"borough": "Queens", "cuisine": "Brazilian"}},
		{$group: {"_id": "$address.zipcode", "count": {$sum: 1}}}
		]).toArray(function(err, result) {
			assert.equal(err, null);
			console.log(result);
			callback(result);
		});
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	aggregateRestaurants(db, function() {
		db.close();
	});
});