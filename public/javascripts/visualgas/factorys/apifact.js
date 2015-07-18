angular.module('visualGas')
  .factory('api', ['$http', '$state', function($http, $state){

    var urlBase = '/visualgas/api/';
    var api = {};
    api.get = {};
    api.post = {};
    api.put = {};
    api.delete = {};

    api.get.entries = function(){
      return $http.get(urlBase + 'entries')
                  .error(function(data, status){
                    if(status === 401)  $state.transitionTo('login');
                  });
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
      }).error(function(data, status){
        if(status === 401)  $state.transitionTo('login');
      });
    }

    api.post.recommendation = function(text, subject){
      return $http.post(urlBase + 'recommendation', {
        email: text,
        subject: subject
      });
    }

    api.delete.entry = function(id){
      return $http.delete(urlBase + 'entry?id=' + id)
                  .error(function(data, status){
                    if(status === 401)  $state.transitionTo('login');
                  });
    }

    return api;

  }])
