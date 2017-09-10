var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        require: true,
        minlength: 2,
        trim: true
    },
    priority: {
        type: Number
    },
    group: {
        type: String,
        require: true,
        minlength: 2,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

/***Add a new Todo Item
var newTodo = new Todo({
    text: '  Go see a new movie  ',
    priority: 5,
    group: 'personal',
    completed: true,
    completedAt: 58688981
 });

newTodo.save().then((doc) =>{
    console.log('Saved todo', doc);
}, (err) =>{
    console.log('save failed');
});
****/


module.exports = {Todo};