var mainApp = angular.module('mainApp', ['ngAnimate', 'ui.router', 'ui.bootstrap']);

mainApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider){

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/home');

  $uiViewScrollProvider.useAnchorScroll();

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl : '/partials/home',
      controller: 'homeCtrl',
      resolve: {
        projects: function($http, api){
          return api.get.projects();
        }
      }
    })
    .state('projects', {
      url: '/projects',
      templateUrl : '/partials/projects',
      controller: 'projectsCtrl',
      resolve: {
        projects: function($http, api){
          return api.get.projects();
        }
      }
    })
});
