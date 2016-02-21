angular.module('hs')
  .controller('signupCtrl', function($http, $rootScope, $state, api){
    $scope.signUp = function(){
      api.post.signup($scope.email, $scope.password)
              .success(function(data, status){
                if(status === 200) {
                  $rootScope.user = data;
                  $state.transitionTo('cards');
                }
              })
              .error(function(data, status){
                if(status === 401) $scope.message = data;
              })
    }
  });
