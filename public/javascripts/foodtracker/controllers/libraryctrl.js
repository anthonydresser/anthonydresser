var mainApp = angular.module('foodtracker');

mainApp.controller('libraryCtrl', function($scope, $http, $rootScope, $q, $state, api){
    $scope.yourRecipts = [];
    $scope.includedRecipts = [];
    getRecipts();


    function getRecipts() {
        api.get.myrecipts().success(function(data, status){
            $scope.yourRecipts = data;
        })

        api.get.recipts().success(function(data, status){
            $scope.includedRecipts = data;
        })
    }

    $scope.transition = function(recipt){
        console.log(recipt);
        $state.transitionTo('recipt', {recipt: recipt});
    }
});
