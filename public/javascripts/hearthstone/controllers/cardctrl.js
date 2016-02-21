var mainApp = angular.module('hs');

mainApp.controller('cardsCtrl', function($scope, $http, $rootScope){
    var wholeset;
    var startNumberCards = 20;
    var incrementValue = 10;
    var currentNumber = 0;
    var allCards = [];
    var scrollHolder = [];
    var scrollLock = 0;
    $scope.loading = true;
    $scope.cards = [];
    $http.get('/hearthstone/api/cards/all').success(function(data, status){
        //console.log(data);
        wholeset = data;
        allCards = allCards.concat(data['Blackrock Mountain'], data['Classic'], data['Goblins vs Gnomes'], data['Naxxramas'], data['The Grand Tournament'], data['The League of Explorers']);
        scrollHolder = allCards;
        $scope.cards = scrollHolder.slice(0, startNumberCards);
        currentNumber = startNumberCards;
        $scope.loading = false;
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
