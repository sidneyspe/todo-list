angular.module('todo-list', [])
  .controller('TodoListController', function($scope, $http) {
    var vm = this;
    var lastID = 2;
    vm.todos = [];
    // when landing on the page, get all todos and show them

  vm.getTodos = function() {
    $http({
      method: 'GET',
      url: '/api/todos'
    }).then(function(response) {
      vm.todos = response.data;
      console.log(response);
    }, function(error) {
      console.log('Error: ' + error);
    });
  };

  vm.todos = vm.getTodos();
  // console.log(vm.todos)
    // delete a todo after checking it
    vm.deleteTodo = function(id) {
      $http({
        method: 'DELETE',
        url: '/api/todos' + id
      }).then(function(response) {
        vm.todoText = '';
        // console.log(response);
      }, function(error) {
        console.log('Error: ' + error);
      });
    };

    vm.addTodo = function() {
      $http({
        method: 'POST',
        url: '/api/todos',
        data: vm
      }).then(function(response) {
        vm.todoText = '';
        // console.log(response);
      }, function(error) {
        console.log('Error: ' + error);
      });
    };

    vm.remaining = function() {
      var count = 0;
      angular.forEach(vm.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    vm.archive = function() {
      var oldTodos = vm.todos;
      vm.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) vm.todos.push(todo);
      });
    };

    vm.mark = function(id) {
      vm.todos[id].done = !vm.todos[id].done;
    };

    vm.remove = function(id) {
      vm.todos.splice(id, 1);
    };



  });
