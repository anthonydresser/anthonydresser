var mainApp = angular.module('mainApp', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'infinite-scroll']);

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
        projects: function(api){
          return api.get.projects();
        },
        backgroundImage: function($q){
          var max = 8;
          var min = 1;
          var deferred = $q.defer();
          var reso = window.screen.availWidth
          var size = '';
          if(reso > 2500){
            size = 'xl';
          } else if(reso > 1900){
            size = 'l';
          } else if(reso > 1000) {
            size = 'm';
          } else {
            size = 's';
          }

          var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
          var img = new Image();
          img.src = '/images/front_' + ranNum + '_' + size + '.png';

          if(img.completed){
            deferred.resolve({img: img.src,
                              credit: (ranNum != 1)});
          }

          img.addEventListener('load', function(){
            deferred.resolve({img: img.src,
              credit: (ranNum != 1)});
          })

          img.addEventListener('error', function(e){
            console.log('Error loading img', e);
            deferred.reject();
          })

          return deferred.promise;
        }
      }
    })
    .state('projects', {
      url: '/projects?filterBy',
      templateUrl : '/partials/projects',
      controller: 'projectsCtrl',
      resolve: {
        projects: function(api){
          return api.get.projects();
        }
      }
    })
      .state('aboutme', {
        url: '/aboutme',
        templateUrl: '/partials/aboutme',
        controller: 'aboutmeCtrl',
        resolve: {
          backgroundImage: function($q){
            var max = 8;
            var min = 1;
            var deferred = $q.defer();
            var reso = window.screen.availWidth
            var size = '';
            if(reso > 2500){
              size = 'xl';
            } else if(reso > 1900){
              size = 'l';
            } else if(reso > 1000) {
              size = 'm';
            } else {
              size = 's';
            }

            var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
            var img = new Image();
            img.src = '/images/front_' + ranNum + '_' + size + '.png';

            if(img.completed){
              deferred.resolve({img: img.src,
                credit: (ranNum != 1)});
            }

            img.addEventListener('load', function(){
              deferred.resolve({img: img.src,
                credit: (ranNum != 1)});
            })

            img.addEventListener('error', function(e){
              console.log('Error loading img', e);
              deferred.reject();
            })

            return deferred.promise;
          }
        }
      })
      .state('gw2', {
        url: '/gw2',
        templateUrl: '/partials/gw2',
        controller: 'gw2Ctrl'
      })
      .state('ai', {
        url: '/ai',
        templateUrl: '/partials/ai',
        controller: 'aiCtrl'
      })
      .state('hearthstone', {
        url: '/hearthstone',
        templateUrl: '/partials/hearthstone',
        controller: 'hearthstoneCtrl'
      })
});
