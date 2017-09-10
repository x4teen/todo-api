const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/projectDB';

MongoClient.connect(url, (err, db) => {
    if (err)  {
        return console.log ('Unable to connect to MongoDB Server');
    } 

    console.log ('Connected to MongoDB Server');
    //make your database calls
    
        // updateMany
    db.collection('user').updateMany ({name : 'Faisal Ahmed'}, {
         $set: {
            "address.street": "150 Mayflower Drive",
            "address.city": "Newark",
            "address.zip": "07107"
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        
    });


    db.close();      

});