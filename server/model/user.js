var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    }
    
});


/***Add a new user

var newUser = new user({
    email: '  ryank@mnrnyc.com  '
 });

 
newUser.save().then((doc) =>{
    console.log('Saved user', doc);
}, (err) =>{
    console.log('save failed');
});
 */


 module.exports = {User};