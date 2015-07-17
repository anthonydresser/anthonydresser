angular.module('visualGas', ['ui.router', 'ui.bootstrap', 'd3'])
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home')

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl : 'home',
      controller : 'homeCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl : 'login',
      controller : 'loginCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl : 'signup',
      controller : 'signupCtrl'
    })
    .state('account', {
      url: '/account',
      templateUrl : 'account',
      controller : 'accountCtrl'
    })
    .state('data', {
      url: '/data',
      templateUrl : 'data',
      controller : 'dataCtrl',
      resolve: {
        entryData : function(api){
          return api.get.entries()
                        .success(function(data, status){
                          angular.forEach(data, function(entry){
                            entry.date = new Date(entry.date);
                            entry.dateString = entry.date.toLocaleDateString();
                            data.sort(function(a, b){
                              return a.date < b.date;
                            });
                          })
                          angular.forEach(data, function(entry, key){
                            if(key < (data.length - 1)){
                              entry.avg = (entry.mileage - data[key + 1].mileage)/entry.gallons;
                              if(key < (data.length - 2)){
                                if(entry.avg > data[key + 1].avg){
                                  console.log(entry.avg + ' is greater than ' + data[key + 1].avg);
                                  entry.avgStyle = {'color':'green'};
                                } else if(entry.avg < data[key + 1].avg){
                                  console.log(entry.avg + ' is less than ' + data[key + 1].avg)
                                  entry.avgStyle = {'color':'red'};
                                } else {
                                  entry.avgStyle = {'color':'black'};
                                }
                              } else {
                                entry.avgStyle = {'color':'black'};
                              }
                            }
                          })
                          return data;
                        })
        }
      }
    })
})
