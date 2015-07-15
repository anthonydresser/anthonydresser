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

visualGas.controller('dataCtrl', function($http, $scope, $modal){

  $scope.deleteEntry = function(entry){
    $http.delete('/visualgas/entry?id=' + entry['_id'])
    .success(function(data, status){
      $scope.getEntries();
      // $scope.entries.splice($scope.entries.indexOf(entry), 1);
    }).error(function(data, status){
      console.log(data);
    })
  }

  $scope.getEntries = function(){
    $http.get('/visualgas/myentries')
    .success(function(data, status){
      $scope.entries = data;
      console.log(data);
      angular.forEach($scope.entries, function(entry){
        entry.dateString = new Date(entry.date).toLocaleDateString();
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
      $scope.getEntries();
    })
  }

  $scope.getEntries();
})

visualGas.controller('addEntryModalCtrl', function($http, $scope, $modalInstance){
  Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
  });

  angular.element(document).ready(function () {
    setDate(new Date());
  });

  function setDate(date){
    z=$(date).attr('value');

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;

    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm}
    today = yyyy+'-'+mm+'-'+dd;

    $('#date').val(today);
  }

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
