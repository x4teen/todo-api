var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var ObjectID = require ('mongoose').Types.ObjectId;
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT||3000;

app.use(bodyParser.json());



/** ROUTE - POST:baseurl/todos - Adds a single todo item */
app.post('/todos', (req, res) => {
    
    var todo = new Todo({
        text: req.body.text,
        completedAt: req.body.completedAt,
        completed: req.body.completed,
        priority: req.body.priority,
        group: req.body.group
    });

    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) => {
        res.status(400).send();
    });    
});
/** END OF ROUTE - POST:baseurl/todos */



/** ROUTE - GET:baseurl/todos - returns all todo items */
app.get('/todos', (req, res) => {
    Todo.find().then((todos) =>{
        res.send({todos});
    })
}, (e) => {
    res.status(400).send();
});
/** END OF ROUTE - GET:baseurl/todos */



/** ROUTE - GET:baseurl/todos/id - returns one todo item with stated id */
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    //If ObjectID not valid send back error
    if (!ObjectID.isValid(id)) {
        res.status(400).send();
    };

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return  res.status(404).send();
        };
        res.send(todo);
    }).catch((e) => res.status(400).send());
});
/** END OF ROUTE - GET:baseurl/todos/id */



/** ROUTE - DELETE:baseurl/todos/id - deletes one todo item with stated id */
app.delete('/todos/:id', (req, res) =>{
    var id = req.params.id; //Get the id

//Validate the id
    if (!ObjectID.isValid(id)) {
        res.status(400).send();
    };

//Delete the object
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return  res.status(404).send();
        };
        res.send(todo);
    }).catch((e) => res.status(400).send());

}); 
/** END OF ROUTE - DELETE:baseurl/todos/id  */



/** ROUTE - PATCH:baseurl/todos/id - updates one todo item with stated id */
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id; //Get the id
    var body = _.pick(req.body, ['text', 'completed', 'group', 'priority']);

    //Validate the id
    if (!ObjectID.isValid(id)) {
        res.status(400).send();
    };

    //update completed field
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    };

    //update database
    Todo.findByIdAndUpdate(id, {$set: body},
        {new: true}).then((todo) => {
        if (!todo) {
            return  res.status(404).send();
        };
        res.send(todo);
    }).catch((e) => res.status(400).send());

});
/** END OF ROUTE - PATCH:baseurl/todos/id */



/** ROUTE - POST:baseurl/user - Adds a new user*/
app.post('/users', (req, res) => {
    var body = _.pick(req.body, 
        ['email', 'password']);
    var user = new User(body);

    user.save().then(() =>{
        return user.generateAuthToken();
    }).then((token) =>{
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });    
});
/** END OF ROUTE - POST:baseurl/user */





/** ROUTE - GET:baseurl/user/me - */
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});
/** END OF ROUTE - GET:baseurl/user/me - */



/** START THE WEB SERVER */
app.listen(port, ()=>{
    console.log(`started on port ${port}`);
}); 







