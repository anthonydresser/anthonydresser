angular.module('foodtracker')
  .factory('api', ['$http', '$state', function($http, $state){

    var urlBase = '/foodtracker/api/';
    var api = {};
    api.get = {};
    api.post = {};
    api.put = {};
    api.delete = {};

    api.post.login = function(email, password){
      return $http.post(urlBase + 'login', {
        username: email,
        password: password
      });
    };

    api.post.signup = function(email, password){
      return $http.post(urlBase + 'signup', {
        username: email,
        password: password
      });
    };

    api.post.logout = function(){
      return $http.post(urlBase + 'logout');
    };

    api.get.users = function(){
        return $http.get(urlBase + 'users')
    }

    api.post.recipt = function(entries){
        return $http.post(urlBase + 'recipt', {
            entries: entries
        })
    }

      api.get.myrecipts = function(){
          return $http.get(urlBase + 'recipt?type=mine')
      }

      api.get.recipts = function(){
          return $http.get(urlBase + 'recipt?type=included')
      }

    return api;

  }]);
