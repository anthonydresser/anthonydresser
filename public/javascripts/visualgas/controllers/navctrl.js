angular.module('visualGas')
  .controller('navCtrl', function($http, $state, $scope, api){
    $scope.logout = function(){
      $rootScope.user = null;
      api.post.logout
              .success(function(data, status){
                if(status === 200){
                  $rootScope.user = null;
                  $state.transitionTo('home')
                }
              });
    }
  });
