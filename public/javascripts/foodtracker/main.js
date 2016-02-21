var mainApp = angular.module('foodtracker', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'infinite-scroll']);

mainApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider){

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/library');

  $uiViewScrollProvider.useAnchorScroll();

  $stateProvider
      .state('reciptInput', {
        url: '/reciptInput',
        templateUrl : 'partials/reciptInput',
        controller : 'reciptInputCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl : 'partials/login',
        controller : 'loginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl : 'partials/signup',
        controller : 'signupCtrl'
      })
      .state('library', {
          url: '/library',
          templateUrl : 'partials/library',
          controller : 'libraryCtrl'
      })
      .state('recipt', {
          url: '/recipt/{recipt:json}',
          templateUrl :'partials/recipt',
          controller : 'reciptCtrl',
          params : {recipt: null}
      })
});
