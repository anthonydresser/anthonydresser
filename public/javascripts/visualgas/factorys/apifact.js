angular.module('visualGas')
  .factory('api', ['$http', function($http){

    var urlBase = '/visualgas/api/';
    var api = {};
    api.get = {};
    api.post = {};
    api.put = {};
    api.delete = {};

    api.get.entries = function(){
      return $http.get(urlBase + 'entries');
    }

    api.post.login = function(email, password){
      return $http.post(urlBase + 'login', {
        username: email,
        password: password
      });
    }

    api.post.signup = function(email, password){
      return $http.post(urlBase + 'signup', {
        username: email,
        password: password
      });
    }

    api.post.logout = function(){
      return $http.post(urlBase + 'logout');
    }

    api.post.entry = function(mileage, gallons, ppg, date){
      return $http.post(urlBase + 'entry', {
        mileage: mileage,
        gallons: gallons,
        ppg: ppg,
        date: date
      });
    }

    api.delete.entry = function(id){
      return $http.delete(urlBase + 'entry?id=' + id);
    }

    return api;

  }])
