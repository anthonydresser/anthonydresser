var mainApp = angular.module('mainApp', ['ngAnimate', 'ui.router', 'ui.bootstrap']);

mainApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl : 'home',
      controller: 'homeCtrl',
      resolve: {
        projects: function($http, api){
          return api.get.projects();
        }
      }
    })
    .state('projects', {
      url: '/projects',
      templateUrl : 'projects',
      controller: 'projectsCtrl',
      resolve: {
        projects: function($http, api){
          return api.get.projects();
        }
      }
    })
});
