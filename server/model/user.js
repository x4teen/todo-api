const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema(
    {
    email: {
        type: String,
        require: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator : validator.isEmail,
        message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
             },
        token: {
            type: String,
           
        }
    }]
    
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), 
        access}, 'abc123').toString();
    
    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
     } catch (e) {
        return Promise.reject();
    };

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
    
};



var User = mongoose.model('User', UserSchema);


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