const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/projectDB';

MongoClient.connect(url, (err, db) => {
    if (err)  {
        return console.log ('Unable to connect to MongoDB Server');
    } 

    console.log ('Connected to MongoDB Server');
    //make your database calls
    
    db.collection('user').find({"address.city": "Dix Hills"}).toArray().then((docs) =>{
        console.log('Users :');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    })


    db.close();
    

});