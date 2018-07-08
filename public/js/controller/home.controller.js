angular.module('todo-list', [])
  .controller('TodoListController', function() {
    var vm = this;
    var lastID = 2;
    vm.todos = [
      {id: 0, text:'learn AngularJS', done:true},
      {id: 1, text:'build an AngularJS app', done:false}];

    vm.addTodo = function() {
      vm.todos.push({id: vm.lastID, text:vm.todoText, done:false});
      vm.todoText = '';
      vm.lastID += 1;
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
      vm.todos.splice(id,1);
    };



  });
