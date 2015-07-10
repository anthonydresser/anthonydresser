var visualGas = angular.module('visualGas', ['ui.router', 'ui.bootstrap']);

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
    .state('data', {
      url: '/data',
      templateUrl : 'data'
    })
});
