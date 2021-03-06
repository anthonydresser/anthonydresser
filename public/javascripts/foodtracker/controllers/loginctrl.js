angular.module('foodtracker')
  .controller('loginCtrl', function($http, $scope, $state, $rootScope, api){
    $scope.login = function(){
      api.post.login($scope.email, $scope.password)
              .success(function(data, status){
                if(status === 200) {
                  $rootScope.user = data;
                  $state.transitionTo('library');
                }
              })
              .error(function(data, status){
                if(status === 401) $scope.message = data;
              });
    }
  });
