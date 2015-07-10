var visualGas = angular.module('visualGas');

visualGas.controller('navCtrl', function($http, $scope){
  $scope.logout = function(){
    $rootScope.user = null;
    $http.post('/visualgas/logout');
  }
});

visualGas.controller('homeCtrl', function($scope){

});

visualGas.controller('loginCtrl', function($http, $scope, $state, $rootScope){
  $scope.login = function(){
    $http.post('/visualgas/login', {
                                      username: $scope.email,
                                      password: $scope.password
                                   })
         .success(function(data, status){
           if(status === 200) {
             $rootScope.user = data;
             $state.transitionTo('account');
           }
         })
         .error(function(data, status){
           if(status === 401) $scope.message = data;
         });
  }
})

visualGas.controller('signupCtrl', function($scope){

})

visualGas.controller('accountCtrl', function($scope){

})
