// this is about the same as "use fruitsDB" on the command line

const mongoose = require ( "mongoose" );

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new mongoose
const client = new mongoose.connect (
    url + "/" + dbName,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    } );

const fruitSchema = new mongoose.Schema ( {
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
} );

const Fruit = mongoose.model ( "Fruit", fruitSchema );

const personSchema = new mongoose.Schema ( {
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
} );

const apple = new Fruit ( {
    name: "Apple",
    rating: 2,
    review: "Pretty solid as a fruit"
} );

// apple.save ();

const peach = new Fruit ( {
    name: "Peach",
    rating: 10,
    review: "who doesn't love peaches"
} );

// peach.save();

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 7,
    review: "a bit prickly"
});

const kiwi = new Fruit ( {
    name: "Kiwi",
    rating: 3,
    review: "kind of a hairy fruit"
} );

const orange = new Fruit ( {
    name: "Orange",
    rating: 4,
    review: "Too sour for me"
} );

const banana = new Fruit ( {
    name: "banana",
    rating: 3,
    review: "weird texture"
} );

// Uncomment to add fruits to database
Fruit.insertMany([kiwi, orange, banana, apple, pineapple], function (err) {
    if(err){
        console.log (err);
    }
    else{
        console.log ("successfully saved all the fruits");
    }
});

const Person = mongoose.model ( "Person", personSchema );

const john = new Person ( {
    name: "John",
    age: 65,
    favoriteFruit: kiwi
} );

const amy = new Person ({
   name: "Amy",
   age: 12,
   favoriteFruit: pineapple
});

// Uncomment to add fruits to database
Person.insertMany([john, amy], (err) =>{
    if(err){
        console.log (err)
    }
    else{
        console.log ("inserted people");
    }
});

// Person.updateOne({name: "John"}, {favoriteFruit: kiwi }, (err) => {
//     if(err){
//         console.log ("failed to update John");
//     }else{
//         console.log ("updated John");
//     }
// });

Fruit.find ( function (err, fruits) {
    if (err) {
        console.log ( err );
    } else {
        fruits.forEach ( (fruit) => {
            console.log ( fruit.name + ": " + fruit.rating )
        } );
    }
    mongoose.connection.close ();
} );
//
// const res = Fruit.updateOne ( {_id: "5e9b781673752b7064c8d95c"}, {name: "Peach"}, function (err) {
//     if (err) {
//         console.log ( err );
//     } else {
//         console.log ( "updated peach" );
//     }
// } );
// console.log ( res );
//
// Fruit.deleteOne ( {name: "Peach"}, function (err) {
//     if (err) {
//         console.log ( err );
//     } else {
//         console.log ( "deleted peach" );
//     }
// } )

// Fruit.deleteMany ( {name: /\*/}, (err) => {
// } );
// Fruit.deleteMany ( {score: {$gt: 0}}, (err) => {
// } );