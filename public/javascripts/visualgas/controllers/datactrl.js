angular.module('visualGas')
.controller('dataCtrl', function($http, $scope, $modal, api, entryData){

  $scope.changeGraphData = function(){
    var data = [];
    angular.forEach($scope.entries, function(entry, key){
      var isAvg = $scope.graphDataX == 'avg' || $scope.graphDataY == 'avg';
      if((isAvg && (key != $scope.entries.length - 1)) || !isAvg){
        var obj = {};
        obj.x = entry[$scope.graphDataX];
        obj.y = entry[$scope.graphDataY];
        data.push(obj);
      }
    });
    data.sort(function(a, b){
      return a.x > b.x;
    })
    $scope.graphData = data;
  }

  $scope.$watch(function(){
    return $scope.entries;
  }, function(){
    $scope.changeGraphData();
  });

  $scope.entries = entryData.data;

  $scope.xOptions = [{val : 'date', name : 'Time'},
  {val : 'ppg', name : 'Price Pre Gallon'},
  {val : 'mileage', name : 'Mileage'},
  {val : 'gallons', name : 'Gallons'},
  {val : 'avg', name: 'Average Miles Pre Gallon'}];
  $scope.yOptions = [{val : 'ppg', name : 'Price Pre Gallon'},
  {val : 'mileage', name : 'Mileage'},
  {val : 'gallons', name : 'Gallons'},
  {val : 'avg', name: 'Average Miles Pre Gallon'}];

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
      angular.forEach($scope.entries, function(entry, key){
        if(key > 0){
          entry.avg = (entry.mileage - data[key - 1].mileage)/entry.gallons;
        }
        entry.date = new Date(entry.date);
        entry.dateString = entry.date.toLocaleDateString();
      })
      $scope.entries.sort(function(a, b){
        return a.date < b.date;
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

})
