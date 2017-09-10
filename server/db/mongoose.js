var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/projectDB';

mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});

module.exports = { mongoose};
