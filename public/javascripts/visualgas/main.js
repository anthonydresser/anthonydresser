var visualGas = angular.module('visualGas', ['ngRoute']);

visualGas.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'visualgas/home',
      controller  : 'homeCtrl'
    })
    .when('/login', {
      templateUrl : 'visualgas/login',
      controller  : 'loginCtrl'
    })
    .when('/signup', {
      templateUrl : 'visualgas/signup',
      controller  : 'signupCtrl'
    })
    .when('/account', {
      templateUrl : 'visualgas/account',
      controller  : 'accountCtrl'
    })
    .otherwise({ redirectTo: '/visualgas'});
}]);
