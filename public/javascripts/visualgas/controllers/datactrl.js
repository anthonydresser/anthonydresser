angular.module('visualGas')
.controller('dataCtrl', function($window, $http, $scope, $modal, api, entryData){

  $scope.changeGraphData = function(){
    var data = [];
    angular.forEach($scope.entries, function(entry, key){
      var isAvg = $scope.graphDataX == 'avg' || $scope.graphDataY == 'avg';
      if((isAvg && entry.avg) || !isAvg){
        var obj = {};
        obj.x = entry[$scope.graphDataX];
        obj.y = entry[$scope.graphDataY];
        data.push(obj);
      }
    });
    data.sort(function(a, b){
      return a.x > b.x;
    });
    $scope.graphData = data;
  };

  $scope.updateData = function(){
    var data = $scope.entries;
    angular.forEach($scope.entries, function(entry, key){
      if(key < ($scope.entries.length - 1)){
        entry.avg = (entry.mileage - $scope.entries[key + 1].mileage)/entry.gallons;
        entry.avg = 10*entry.avg;
        entry.avg = Math.round(entry.avg);
        entry.avg = entry.avg/10;
        if(key < ($scope.entries.length - 2)){
          if(entry.avg > $scope.entries[key + 1].avg){
            entry.avgStyle = {'color':'green'};
          } else if(entry.avg < $scope.entries[key + 1].avg){
            entry.avgStyle = {'color':'red'};
          } else {
            entry.avgStyle = {'color':'black'};
          }
        } else {
          entry.avgStyle = {'color':'black'};
        }
      } else if(entry.avg){
        delete entry.avg;
      }
    })
  };

  $scope.$watch(function(){
    return $scope.entries;
  }, function(){
    $scope.updateData();
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
  };

  $scope.getEntries = function(){
    return api.get.entries()
    .success(function(data, status){
      $scope.entries = data;
      angular.forEach($scope.entries, function(entry){
        entry.date = new Date(entry.date);
        entry.dateString = entry.date.toLocaleDateString();
        $scope.entries.sort(function(a, b){
          return a.date < b.date;
        });
      });
      angular.forEach($scope.entries, function(entry, key){
        if(key < ($scope.entries.length - 1)){
          entry.avg = (entry.mileage - $scope.entries[key + 1].mileage)/entry.gallons;
          if(key > ($scope.entries.length - 2)){
            if(entry.avg > $scope.entries[key + 1].avg){
              entry.avgStyle = {'color':'green'};
            } else if(entry.avg < $scope.entries[key + 1].avg){
              entry.avgStyle = {'color':'red'};
            } else {
              entry.avgStyle = {'color':'black'};
            }
          } else {
            entry.avgStyle = {'color':'black'};
          }
        }
      })
    });
  };

  $scope.addEntry = function(){
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: '/visualgas/templates/addentrymodal',
      controller: 'addEntryModalCtrl'
    });

    modalInstance.result.then(function(){
      //TODO speed up this process
      $scope.getEntries();
    })
  }

});
