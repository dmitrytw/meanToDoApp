angular.module('todoController', [])
	.controller('mainController', function($scope, $http, Todos) {
		$scope.formData = {};
		//when landing on the page, get all todos and show them
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error:' + data);
			});

		//when submitting the add form, send the text to the node API
		$scope.createTodo = function() {
			//validate the formData to make sure that smth is there
			//if form is empty, nothing will happen 
			// people can't just hold enter and adding new todos
			if (!$.isEmptyObject($scope.formData){

				//call the create function from our service
				Todos.create($scope.formData)

					//if successful creation, call out get function 
					.success.(function(data) {
						$scope.formData = {}; //clear the form, so that user can enter new todos
						$scope.todos = data; //assign our new list of todos
					})
					.error(function(data) {
					console.log('Error:', data);
				});
			};

		// Delete =========================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			Todos.delete(id)
				//if successful creation, call out get function
				.success(function(data) {
					$scope.todos = data; //assign out new list of todos
				})
				.error(function(data) {
					console.log('Error:', data);
				});
		};
	});