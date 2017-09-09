const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/projectDB';

MongoClient.connect(url, (err, db) => {
    if (err)  {
        return console.log ('Unable to connect to MongoDB Server');
    } 

    console.log ('Connected to MongoDB Server');
    //make your database calls
    // db.collection('customer').insertOne({
    //     name: "Grant Management Services",
    //     address: {
    //         street:"",
    //         city: "Great Neck",
    //         state: "NY",
    //         zip: ""
    //     }}, (err, result) => {
    //         if (err) {
    //             return console.log('unable to add record', err);
    //         }
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //         });
    
    db.collection('user').insertOne({
        name: "Faisal Ahmed",
        address: {
            street:"380 Canal Pl",
            city: "Bronx",
            state: "NY",
            zip: ""
        }}, (err, result) => {
            if (err) {
                return console.log('unable to add record', err);
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
            });


    db.close();
    

});