(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'javascript/HomePage/home.html'
		}).state('Register', {
			url: '/Register',
			templateUrl: '/javascript/Users/register.html'
		}).state('Login', {
			url: '/Login',
			templateUrl: '/javascript/Users/login.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
