const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/projectDB';

MongoClient.connect(url, (err, db) => {
    if (err)  {
        return console.log ('Unable to connect to MongoDB Server');
    } 

    console.log ('Connected to MongoDB Server');
    //make your database calls
    
    // deleteMany
    // db.collection('user').deleteMany({name : 'Faisal Ahmed'}).then((result) =>{
    //     console.log(result);
    // }, (err) => {
    //     console.log('No matching item found.');
    // });

     // deleteOne
    //  db.collection('user').deleteOne({name : 'Faisal Ahmed'}).then((result) =>{
    //     console.log(result);
    // }, (err) => {
    //     console.log('No matching item found.');
    // });

    // findOneAndDelete
    db.collection('user').findOneAndDelete({name : 'Faisal Ahmed'}).then((result) =>{
        // if (result.value === null) {
        //     throw new Error('Nothing found.');
        // }
        console.log(result);
    }, (err) => {
        console.log('Nothing found');
    });


    db.close();      

});