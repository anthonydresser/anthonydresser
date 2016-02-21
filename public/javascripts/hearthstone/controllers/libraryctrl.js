var mainApp = angular.module('hs');

mainApp.controller('libraryCtrl', function($scope, $http, $rootScope, $q){
    var wholeset;
    var startNumberCards = 20;
    var incrementValue = 10;
    var currentNumber = 0;
    var allCards = [];
    var scrollHolder = [];
    var scrollLock = 0;
    $scope.loading = true;
    $scope.cards = [];
    $http.get('/hearthstone/api/library').success(function(data, status){
        //console.log(data);
        var deferedArray = [];
        data.forEach(function(obj){
            var deferred = $q.defer();
            $http.get('/hearthstone/api/card?name=' + encodeURIComponent(obj.name)).success(function(data, status){
                deferred.resolve();
                //console.log(data);
                scrollHolder.push(data[0]);
            });
            deferedArray.push(deferred.promise);
        });
        $q.all(deferedArray).then(function(){
            $scope.cards = scrollHolder.slice(0, startNumberCards);
            currentNumber = startNumberCards;
            $scope.loading = false;
            //console.log($scope.cards);
        })
    });

    $scope.paging = function(){
        if($scope.loading) return;
        $scope.loading = true;
        $scope.cards = $scope.cards.concat(scrollHolder.slice(currentNumber, currentNumber + incrementValue));
        currentNumber += incrementValue;
        scrollLock = 0;
        $scope.loading = false;
    }

    $scope.add = function(name){
        $http.put('/hearthstone/api/library', {name: name}).success(function(data, status){
            console.log(data, status);
        })
    }
});
