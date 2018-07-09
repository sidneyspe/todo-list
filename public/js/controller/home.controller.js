angular.module('todo-list', [])
  .controller('TodoListController', function($scope, $http) {
    var vm = this;
    vm.todos = [];
    vm.todo = [];
    vm.idEdit = '';

    vm.getTodos = function() {
      $http({
        method: 'GET',
        url: '/api/todos'
      }).then(function(response) {
        vm.todos = response.data;
        // console.log(response);
      }, function(error) {
        console.log('Error: ' + error);
      });
    };

    vm.getTodo = function(id) {
      $http({
        method: 'GET',
        url: '/api/todos/' + id
      }).then(function(response) {
        vm.todo = response.data;
        // console.log(response.data);
      }, function(error) {
        console.log('Error: ' + error);
      });
    };

    vm.todos = vm.getTodos();

    vm.remove = function(id) {
      console.log(id)
      $http({
        method: 'DELETE',
        url: '/api/todos/' + id
      }).then(function(response) {
        vm.todos = response.data;
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
        vm.title = '';
        vm.description = '';
        vm.todos = response.data;
      }, function(error) {
        console.log('Error: ' + error);
      });
    };

    vm.getTodo = function(todo) {
      $('.modal').modal('toggle')
      vm.idEdit = todo._id;
      vm.titleEdit = todo.title;
      vm.descriptionEdit = todo.description;
    };

    vm.clearForm = function(){
      vm.titleEdit = '';
      vm.descriptionEdit = '';
      vm.todos = response.data;
    }

    vm.updateTodo = function() {
      $http({
        method: 'POST',
        url: '/api/update',
        data: vm
      }).then(function(response) {
        vm.title = '';
        vm.description = '';
        vm.todos = response.data;
        $('.modal').modal('toggle')
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

    vm.mark = function(todo) {
      $http({
        method: 'post',
        url: '/api/markTODO/',
        data: todo
      }).then(function(response) {
        vm.todos = response.data;
        // console.log(response);
      }, function(error) {
        console.log('Error: ' + error);
      });

    };

  });
