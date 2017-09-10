var express = require('express');
var bodyParser = require('body-parser');

var ObjectID = require ('mongoose').Types.ObjectId;
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
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
        res.status(400).send(e);
    });    
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) =>{
        res.send({todos});
    })
}, (e) => {
    res.status(400).send(e);
});

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


app.listen(3000, ()=>{
    console.log('started on port 3000');
});







