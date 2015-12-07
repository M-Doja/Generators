(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider<% if(html5mode === 'html5 mode') { %>, $urlMatcherFactoryProvider, $locationProvider<% } %>) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: '/templates/home.html',
      controller: 'HomeController as vm'
		});
		$urlRouterProvider.otherwise('/');
		<% if(html5mode === 'html5 mode') { %>$urlMatcherFactoryProvider.caseInsensitive(true);
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode(true);<% } %>
	}
})();
