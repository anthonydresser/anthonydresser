var mainApp = angular.module('mainApp', ['ui.router']);

mainApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('/', {
      url: '/',
      templateUrl : '/index'
    })
    .state('projects', {
      url: '/projects',
      templateUrl : '/projects'
    });
});
