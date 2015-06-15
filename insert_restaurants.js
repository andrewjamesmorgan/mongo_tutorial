var MongoClient = require('./node_modules/mongodb').MongoClient;
var ObjectId = require('./node_modules/mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

var InsertDocument = function(db, callback) {
	db.collection('restaurants').insertOne( {
		"address" : {
			"street" : "Boyn Hill Road",
			"zipcode" : "SL64JB",
			"building" : "6",
			"coord" : [ -73.9557413, 40.7720266 ]
		},
		"borough" : "Maidenhead",
		"cuisine" : "Indian",
		"grades" : [
			{
				"date" : new Date("2014-10-01T00:00:00Z"),
				"grade" : "A",
				"score" : 11
			}, 
			{
				"date" : new Date("2014-01-16T00:00:00Z"),
				"grade" : "B",
				"score" : 17
			}
		],
		"name" : "ClusterDB",
		"restaurant_id" : "41704620" 
	}, function (err, result) {
		assert.equal(err, null);
		console.log("Inserted a document into the restaurants collection.");
		callback(result);
	});
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	InsertDocument(db, function(result) {
		console.log('Result = ' + result);
		db.close();
	});
});