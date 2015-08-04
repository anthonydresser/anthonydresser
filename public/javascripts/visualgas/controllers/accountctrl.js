angular.module('visualGas')
  .controller('accountCtrl', function($scope, api){
    $scope.send = function(){
      api.post.recommendation($scope.content, $scope.subject);
    }
  });
