angular.module('mainApp')
  .factory('api', ['$http', '$state', function($http, $state){

    var urlBase = '/visualgas/api/';
    var api = {};
    api.get = {};
    api.post = {};
    api.put = {};
    api.delete = {};

    api.get.projects = function(){
      return $http.get('api/projects');
    };

    return api;

  }]);
