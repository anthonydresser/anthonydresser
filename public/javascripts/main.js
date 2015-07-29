var mainApp = angular.module('mainApp', ['ui.router', 'ui.bootstrap']);

mainApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home')

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl : 'home',
      controller: 'homeCtrl'
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
