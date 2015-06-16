var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('Home',{
		url: '/',
		templateUrl: 'views/home.html'
	});
}]);