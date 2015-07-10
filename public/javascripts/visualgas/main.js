var visualGas = angular.module('visualGas', ['ui.router']);

visualGas.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home')

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl : 'home'
    })
    .state('login', {
      url: '/login',
      templateUrl : 'login'
    })
    .state('signup', {
      url: '/signup',
      templateUrl : 'signup'
    })
    .state('account', {
      url: '/account',
      templateUrl : 'account'
    })
});
