angular.module('hs')
  .factory('api', ['$http', '$state', function($http, $state){

    var urlBase = '/hearthstone/api/';
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

    return api;

  }]);
