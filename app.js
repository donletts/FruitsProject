// this is about the same as "use fruitsDB" on the command line

const mongoose = require("mongoose");

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new mongoose
const client = new mongoose.connect(
    url + "/" + dbName,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    } );

const fruitSchema = new mongoose.Schema({
   name: String,
   rating: Number,
   review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit( {
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit"
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
   name: "John",
   age: 65
});

// person.save();

const kiwi = new Fruit({
   name: "Kiwi",
   rating: 3,
   review: "kind of a hairy fruit"
});

const orange = new Fruit({
    name: "Orange",
    rating: 4,
    review: "Too sour for me"
});

const banana = new Fruit({
   name: "banana",
   rating: 3,
   review: "weird texture"
});

Fruit.insertMany([
    kiwi,
    orange,
    banana,
    apple
], function (err) {
    if(err){
        console.log (err);
    }
    else{
        console.log ("successfully saved all the fruits");
    }
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