angular.module('visualGas')
  .controller('addEntryModalCtrl', function($http, $scope, $modalInstance, api){

    $scope.ok = function(){
      //add Entry here
      var date = new Date($scope.date);
      date = date.toJSON();

      api.post.entry($scope.mileage, $scope.gallons, $scope.ppg, date)
              .success(function(data, status){
                $modalInstance.close();
              })
              .error(function(data, status){
                console.log('Error: ' + status + ' ; ' + data);
              });
    }

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    }
  })
