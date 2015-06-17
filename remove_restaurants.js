var MongoClient = require('./node_modules/mongodb').MongoClient;
var ObjectId = require('./node_modules/mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
/*
var removeRestaurants = function(db, callback) {
	db.collection('restaurants').deleteMany(
		{"borough": "Manhattan"},
		function(err, results){
			console.log(results);
			callback();
		}
	);
};

var removeRestaurants = function(db, callback) {
	db.collection('restaurants').deleteOne(
		{"borough": "Queens"},
		function(err, results){
			console.log(results);
			callback();
		}
	);
};


var removeRestaurants = function(db, callback) {
	db.collection('restaurants').deleteMany(
		{},
		function(err, results){
			console.log(results);
			callback();
		}
	);
};
*/

var dropRestaurants = function(db, callback){
	db.collection('restaurants').drop(function(err, response) {
		console.log(response);
		callback();
	});
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	dropRestaurants(db, function() {
		db.close();
	});
});