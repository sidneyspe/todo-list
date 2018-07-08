var Todo = require('../models/todo');

function getTodos(res) {
  Todo.find(function(err, todos) {

    if (err) {
      res.send(err);
    }

    res.json(todos);
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
