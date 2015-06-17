var MongoClient = require('./node_modules/mongodb').MongoClient;
var ObjectId = require('./node_modules/mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/*
var indexRestaurants = function(db, callback) {
	db.collection('restaurants').createIndex(
		{"cuisine": 1},
		null,
		function(err, results) {
			console.log(results);
			callback();
			}
		);
};
*/

var indexRestaurants = function(db, callback) {
	db.collection('restaurants').createIndex(
		{"cuisine": 1, "address.zipcode": -1},
		null,
		function(err, results) {
			console.log(results);
			callback();
		}
	);
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	indexRestaurants(db, function() {
		db.close();
	});
});