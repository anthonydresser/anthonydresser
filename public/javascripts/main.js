var mainApp = angular.module('mainApp', ['ui.router', 'ui.bootstrap','ngAnimate']);

mainApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('/', {
      url: '/',
      templateUrl : '/index',
      controller: 'indexCtrl'
    })
    .state('projects', {
      url: '/projects',
      templateUrl : '/projects',
      controller: 'projectsCtrl'
    });
});
