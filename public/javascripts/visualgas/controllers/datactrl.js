angular.module('visualGas')
  .controller('dataCtrl', function($http, $scope, $modal, api){

    $scope.xOptions = [{val : 'date', name : 'Time'},
                       {val : 'ppg', name : 'Price Pre Gallon'},
                       {val : 'mileage', name : 'Mileage'},
                       {val : 'gallons', name : 'Gallons'}];
    $scope.yOptions = [{val : 'ppg', name : 'Price Pre Gallon'},
                       {val : 'mileage', name : 'Mileage'},
                       {val : 'gallons', name : 'Gallons'}];

    $scope.deleteEntry = function(entry){
      api.delete.entry(entry['_id'])
                .success(function(data, status){
                  $scope.getEntries();
                  //TODO speed up this process
                  // $scope.entries.splice($scope.entries.indexOf(entry), 1);
                }).error(function(data, status){
                  console.log('Error: ' + status + ' ; ' + data);
                });
    }

    $scope.getEntries = function(){
      return api.get.entries()
                    .success(function(data, status){
                      $scope.entries = data;
                      angular.forEach($scope.entries, function(entry){
                        entry.date = new Date(entry.date);
                        entry.dateString = entry.date.toLocaleDateString();
                      })
                      $scope.entries.sort(function(a, b){
                        var datea = new Date(a.date),
                            dateb = new Date(b.date);

                        if(datea > dateb){
                          return 1
                        } else if(datea < dateb){
                          return -1;
                        } else {
                          return 0;
                        }
                      });
                    });
    }

    $scope.addEntry = function(){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/visualgas/templates/addentrymodal',
        controller: 'addEntryModalCtrl'
      })

      modalInstance.result.then(function(){
        //TODO speed up this process
        $scope.getEntries();
      })
    }

    $scope.changeGraphData = function(){
      var data = [];
      angular.forEach($scope.entries, function(entry){
        var obj = {};
        obj.x = entry[$scope.graphDataX];
        obj.y = entry[$scope.graphDataY];
        data.push(obj);
      });
      $scope.graphData = data;
    }

    $scope.$watch(function(){
      return $scope.entries;
    }, function(){
      $scope.changeGraphData();
    });

    $scope.getEntries().then($scope.changeGraphData());
  })
