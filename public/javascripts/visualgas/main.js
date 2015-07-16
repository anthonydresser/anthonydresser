var visualGas = angular.module('visualGas', ['ui.router', 'ui.bootstrap', 'd3']);

visualGas.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home')

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl : 'home',
      controller : 'homeCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl : 'login',
      controller : 'loginCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl : 'signup',
      controller : 'signupCtrl'
    })
    .state('account', {
      url: '/account',
      templateUrl : 'account',
      controller : 'accountCtrl'
    })
    .state('data', {
      url: '/data',
      templateUrl : 'data',
      controller : 'dataCtrl'
    })
});
