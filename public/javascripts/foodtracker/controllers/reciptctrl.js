/**
 * Created by Anthony on 2/21/16.
 */
var mainApp = angular.module('foodtracker');

mainApp.controller('reciptCtrl', function($scope, $http, $rootScope, $q, $state, $stateParams, api){
    $scope.recipt = $stateParams.recipt;
    console.log($scope.recipt);
});
