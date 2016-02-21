var mainApp = angular.module('foodtracker');

mainApp.controller('reciptInputCtrl', function($scope, $http, $rootScope, api){
    var idCount = 0;
    $scope.entries = [];
    $scope.users = [];
    getUsers();
    $scope.addEntry = function(){
        $scope.entries.push({id:idCount, users:[]});
        idCount++;
    }

    function getUsers(){
        api.get.users().success(function(data, status){
            $scope.users = data;
        });
    }

    $scope.userSelect = function(id){
        $scope.entries.forEach(function(entry, index, array){
            if(entry.id == id) {
                var alreadyFound = false;
                entry.users.forEach(function (user, index, array) {
                    if (user.email == entry.selectedUser.email) {
                        alreadyFound = true;
                    }
                })
                if (!alreadyFound) entry.users.push(entry.selectedUser);
                entry.selectedUser = {};
            }
        });
    }

    $scope.removeUser = function(email, entryid){
        console.log('removing', email, entryid);
        $scope.entries.forEach(function(entry, index, array){
            if(entry.id == entryid){
                entry.users.forEach(function(user, index, array){
                    if(user.email == email){
                        entry.users.splice(index, 1);
                    }
                })
            }
        })
    }

    $scope.submit = function(){
        var r = confirm("Are you sure you want to submit this recipt?");
        if(r){
            api.post.recipt($scope.entries, $scope.payer).success(function(data, status){
                console.log(data);
                $state.transitionTo('library');
            })
        }
    }
});
