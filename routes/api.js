var Todo = require('../models/todo');

function getTodos(res) {
  Todo.find(function(err, todos) {

    if (err) {
      res.send(err);
    }

    res.json(todos);
  });
};

// function getTodo(id) {
//   return Todo.find({'_id': id});
// };
//

function getTodo(res, id) {
  Todo.find({
    '_id': id
  }, function(err, result) {

    if (err)
      res.send(err)

    res.json(result);
  });
};


function getTodosFromUser(res, user_id) {
  Todo.find({
    'user': user_id
  }, function(err, result) {

    if (err)
      res.send(err)

    res.json(result);
  });
};

module.exports = function(app) {

  app.get('/api/todos', function(req, res) {
    getTodosFromUser(res, req.user._id);
  });

  app.post('/api/todos', function(req, res) {

    Todo.create({
      title: req.body.title,
      description: req.body.description,
      done: false,
      user: req.user._id
    }, function(err, todo) {
      if (err)
        res.send(err);
      getTodosFromUser(res, req.user._id);
    });

  });

  app.get('/api/todos/:todo_id', function(req, res) {
    id = req.params.todo_id;
    // console.log(id);
    getTodo(res, id);
    // console.log(res.todo.done);
  });

  app.post('/api/update/', function(req, res) {

    var id =  req.body;

    Todo.update({
      _id: id.idEdit
    }, {
      $set: {
        title: id.titleEdit,
        description: id.descriptionEdit
      }
    }, function(err, todo) {
      if (err)
        res.send(err);
      getTodosFromUser(res, req.user._id);
    });

  });

  app.post('/api/markTODO/', function(req, res) {

    var id =  req.body;

    Todo.update({
      _id: id
    }, {
      $set: {
        done: !id.done
      }
    }, function(err, todo) {
      if (err)
        res.send(err);
      getTodosFromUser(res, req.user._id);
    });

  });

  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);
      getTodosFromUser(res, req.user._id);
    });
  });


};
