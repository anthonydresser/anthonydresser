var visualGas = angular.module('visualGas');

visualGas.controller('navCtrl', function($http, $state, $scope){
  $scope.logout = function(){
    $rootScope.user = null;
    $http.post('/visualgas/logout')
         .success(function(data, status){
           if(status === 200){
             $state.transitionTo('home')
           }
         });
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

visualGas.controller('signupCtrl', function($http, $rootScope, $state, scope){
  $scope.signUp = function(){
    $http.post('/visualgas/signup', {
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
    })
  }
})

visualGas.controller('accountCtrl', function($scope){

})

visualGas.controller('dataCtrl', function($http, $scope, $modal){

  $scope.xOptions = [{val : 'date', name : 'Time'},
                     {val : 'ppg', name : 'Price Pre Gallon'},
                     {val : 'mileage', name : 'Mileage'},
                     {val : 'gallons', name : 'Gallons'}];
  $scope.yOptions = [{val : 'ppg', name : 'Price Pre Gallon'},
                     {val : 'mileage', name : 'Mileage'},
                     {val : 'gallons', name : 'Gallons'}];

  $scope.deleteEntry = function(entry){
    $http.delete('/visualgas/entry?id=' + entry['_id'])
    .success(function(data, status){
      $scope.getEntries();
      //TODO speed up this process
      // $scope.entries.splice($scope.entries.indexOf(entry), 1);
    }).error(function(data, status){
      console.log(data);
    })
  }

  $scope.getEntries = function(){
    return $http.get('/visualgas/myentries')
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
    })
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

  $scope.getEntries().then($scope.changeGraphData());
})

visualGas.controller('addEntryModalCtrl', function($http, $scope, $modalInstance){

  $scope.ok = function(){
    //add Entry here
    var date = new Date($scope.date);
    date = date.toJSON();
    $http.post('/visualgas/addEntry', {
      mileage: $scope.mileage,
      gallons: $scope.gallons,
      ppg: $scope.ppg,
      date: date
    })
    .success(function(data, status){
      console.log(data);
    });

    $modalInstance.close();
  }

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }
})
