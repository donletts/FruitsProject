// this is about the same as "use fruitsDB" on the command line

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url,  { useUnifiedTopology: true } );

// Use connect method to connect to the Server
client.connect(function(err){
   assert.equal(null, err);
    console.log ("Connected Successfully to server");

    const db = client.db(dbName);
    insertFruits(db, function (result) {
        console.log ("we did a thing");
        console.log (result);
        client.close();
    })
    findFruits(db, function (result) {
        console.log (result);
    });
});

const insertFruits = function (db, callback) {
    // Get the fruits collection
    const fruits = db.collection('fruits');

    // insert some stuff
    fruits.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "great fruit"
        },
        {
            name: "Orange",
            score: 6,
            review: "Kinda Sour"
        },
        {
            name: "Banana",
            score: 9,
            review: "Great Stuff"
        }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(result.result.n, 3);
        assert.equal(result.ops.length, 3);
        console.log ("inserted 3 documents");
        callback(result);
    });
};

const findFruits = function (db, callback) {
    // Get the fruits collection
    const fruits = db.collection("fruits");

    // Find some fruit
    fruits.find({}).toArray(function(err, docs){
       assert.equal(err, null);
        console.log ("found the following record");
        console.log (docs);
        callback(docs);
    });
};