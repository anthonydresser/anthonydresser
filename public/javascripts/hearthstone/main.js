var mainApp = angular.module('hs', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'infinite-scroll']);

mainApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider){

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/cards');

  $uiViewScrollProvider.useAnchorScroll();

  $stateProvider
      .state('cards', {
        url: '/cards',
        templateUrl : 'partials/cards',
        controller : 'cardsCtrl'
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
});
