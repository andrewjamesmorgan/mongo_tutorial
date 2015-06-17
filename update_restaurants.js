var MongoClient = require('./node_modules/mongodb').MongoClient;
var ObjectId = require('./node_modules/mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
/* 
var updateRestaurants = function (db, callback) {
	db.collection('restaurants').updateOne(
		{ "restaurant_id" : "41156888"},
		{
			$set: { "address.street": "West 31st Street"},
			$currentDate: {"lastModified": true}
		}, function (err, results) {
			console.log(results);
			callback();
	});
};


var updateRestaurants = function(db, callback) {
	db.collection('restaurants').updateMany (
		{"address.zipcode": "10016", cuisine: "Other"},
		{
			$set: {cuisine: "Category to be Determined"},
			$currentDate: {"lastModified": true}
		},
		function (err, results) {
			console.log(results);
			callback();
		});
	}
*/

var updateRestaurants = function (db, callback) {
	db.collection('restaurants').replaceOne(
		{"restaurant_id" : "41704620"},
		{
			"name" : "Vella 2",
			"address" : {
				"coord" : [ -73.9557413, 40.7720266 ],
				"building" : "1480",
				"street" : "2 Avenue",
				"zipcode" : "10075"
			}
		},
		function (err, results) {
			console.log(results);
			callback();
		}
		);
	};



MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	updateRestaurants(db, function() {
		db.close();
	});
});