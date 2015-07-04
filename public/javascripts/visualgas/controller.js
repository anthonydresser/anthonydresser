var visualGas = angular.module('visualGas');

visualGas.controller('navCtrl', function($http, $scope){
  $scope.logout = function(){
    $http.post('/visualGas/logout');
  }
});

visualGas.controller('homeCtrl', function($scope){

});

visualGas.controller('loginCtrl', function($scope){

})

visualGas.controller('signupCtrl', function($scope){

})

visualGas.controller('accountCtrl', function($scope){
  
})
