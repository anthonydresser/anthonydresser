var mainApp = angular.module('mainApp');

mainApp.controller('navCtrl', function($rootScope, $scope){
});

mainApp.controller('homeCtrl', function($rootScope, $scope, $anchorScroll, projects, backgroundImage){

    $scope.recentProjects = projects.data.slice(0,3);

    $scope.interval = 2500;
    $scope.slides = [{text: 'Javascript'},
        {text: 'C'},
        {text: 'C++'},
        {text: 'HTML'},
        {text: 'AngularJS'},
        {text: 'Verilog'},
        {text: 'Android'},
        {text: 'NodeJS'},
        {text: 'Java'},
        {text: 'Github'},
        {text: 'Arduino'},
        {text: 'Raspberry Pi'},
        {text: 'Bootstrap'},
        {text: 'PCB Design'},
        {text: 'Python'}];

    angular.element(document).ready(function(){
        $('#mainJumbotron').css('background-image', 'url(' + backgroundImage.img + ')');
        if(backgroundImage.credit){
            $('#credit').show();
        } else {
            $('#credit').hide();
        }
        if($(window).width() <= 768){
            $('#carousel').css('margin-left', '-15px');
        } else {
            $('#carousel').css('margin-left','0px');
        }
    });

    $(window).resize(function(){
        if($(window).width() <= 768){
            $('#carousel').css('margin-left', '-15px');
        } else {
            $('#carousel').css('margin-left', '0px');
        }
    });
});

mainApp.controller('projectsCtrl', function($scope, projects, $anchorScroll, $location, $stateParams){

    $scope.Math = window.Math;

    if($stateParams.filterBy){
        $scope.tagSearch = $stateParams.filterBy;
    }

    $scope.scrollTo = function(id){
        $location.hash(id);
        $anchorScroll();
    };

    angular.element(document).ready(function(){
        if($(window).outerWidth() <= 992){
            $('#rightCol').hide();
        } else {
            $('#rightCol').show();
        }
    });

    $(window).resize(function(){
        if($(window).outerWidth() <= 992){
            $('#rightCol').hide();
        } else {
            $('#rightCol').show();
        }
    });
    $scope.projects = projects.data;
    angular.forEach($scope.projects, function(project){
        var dateString = new Date(project.published);
        project.dateString = dateString.toLocaleDateString();
        project.date = new Date(project.published);
    });
    var max = projects.data.length - 1;
    var min = 0;
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    $scope.main = projects.data[ranNum];
});

mainApp.controller('aboutmeCtrl', function($scope, backgroundImage){
    angular.element(document).ready(function(){
        $('#mainJumbotron').css('background-image', 'url(' + backgroundImage.img + ')');
    })

});

mainApp.controller('aiCtrl', function($scope, socket){
    angular.element(document).ready(function(){
        var canvas = angular.element(document.querySelector('#canvas'));
        canvas.attr('width', ($('#canvas-row').width())).attr('height', ($(window).height()));
    })
    socket.on("move", function(data){
        var parths = data.msg.split("(");
        var color = '';
        if(data.msg.indexOf('BLACK') > -1){
            color = 'BLACK';
        } else {
            color = 'RED';
        }
        var objects = parths[1].split(",");
        var x = parseInt(objects[1]);
        var y = parseInt(objects[2]);
        console.log(parths, objects, color, x, y);
        $scope.addPiece(color, x, y);
    });
    $scope.play = function(){
        console.log('playing');
        var boardx = $scope.boardSizeX;
        var boardy = $scope.boardSizeY;
        var winLength = $scope.winLength;
        var options = $scope.playOptions;
        var aiTime = $scope.aiTime;
        socket.emit('setup', {x: boardx, y:boardy, winLength: winLength, options:options, aiTime:aiTime});
    }
    socket.on('setup', function(data){
        if(data.done == 1){
            $scope.drawBoard(data.x, data.y);
        }
    })
    $scope.move = function(x){
        socket.emit('move', {x:x});
    }
    socket.on('finished', function(data){
        $scope.finished();
    })
});

mainApp.controller('gw2Ctrl', function($scope, $http, $q){

    Number.prototype.truncate = function(){
        if(this > 0){
            return Math.floor(this);
        } else if(this < 0){
            return Math.ceil(this);
        } else {
            return this;
        }
    }

    $scope.Math = window.Math;
    $scope.historyTransactions = [];
    $scope.currentTransactions = [];
    $scope.totalMarketInvestment = 0;
    $scope.totalPendingSales = 0;
    $scope.totalProfitLoss = 0;

    var deferred1 = $q.defer();
    var deferred2 = $q.defer();

    getHistoricalData().then(function(data){
        $scope.historyTransactions = data;
        deferred1.resolve();
    });

    getCurrentData().then(function(data){
        $scope.currentTransactions = data;
        deferred2.resolve();
    });

    getRecentData().then(function(data){
        $scope.recentTransactions = data.splice(0, 10);
    });

    $q.all([deferred1.promise, deferred2.promise]).then(function(){
        var totalProfitLoss = 0;
        var totalPendingSales = 0;
        var totalMarketInvestment = 0;
        angular.forEach($scope.currentTransactions, function(transaction){
            if(transaction.sells){
                totalPendingSales += transaction.totalPrice;
            } else if(transaction.buys){
                totalMarketInvestment += Math.abs(transaction.totalPrice);
            }
        });
        angular.forEach($scope.historyTransactions, function(transaction){
            totalProfitLoss += transaction.totalPrice;
        })
        $scope.totalProfitLoss = totalProfitLoss;
        $scope.totalPendingSales = totalPendingSales;
        $scope.totalMarketInvestment = totalMarketInvestment;
    })

    function getCurrentData(){
        var sells;
        var buys;
        var transactions = [];
        var sellsDeferred = $http.get('/gw2/api/tp/current/sells').success(function(data, status){
            sells = data;
        });

        var buysDeferred = $http.get('/gw2/api/tp/current/buys').success(function(data, status){
            buys = data;
        })

        return $q.all([sellsDeferred, buysDeferred]).then(function(){
            angular.forEach(buys, function(buy){
                buy.buys = buy.quantity;
                buy.totalPrice = (buy.quantity * buy.price);
            });

            angular.forEach(sells, function(sell){
                sell.sells = sell.quantity;
                sell.totalPrice = Math.floor(sell.price *.85) * sell.quantity;
            })

            transactions = buys.concat(sells);

            var deferredArray = [];

            angular.forEach(transactions, function(transaction){
                var deferred = $q.defer();
                $http.get('https://api.guildwars2.com/v2/items/' + transaction['item_id']).success(function(data, status){
                    transaction.name = data.name;
                    transaction.imgUrl = data.icon;
                    deferred.resolve();
                })
                deferredArray.push(deferred.promise);
            });

            return $q.all(deferredArray).then(function(){
                transactions.sort(function(a, b){
                    return new Date(b.created) - new Date(a.created);
                })
                return transactions;
            });
        });
    }

    function getRecentData(){
        var sells;
        var buys;
        var transactions = [];
        var sellsDefered = $http.get('/gw2/api/tp/history/sells').success(function(data, status){
            sells = data;
        });

        var buysDefered = $http.get('/gw2/api/tp/history/buys').success(function(data, status){
            buys = data;
        })

        return $q.all([sellsDefered, buysDefered]).then(function() {
            angular.forEach(buys, function(buy){
                buy.buys = buy.quantity;
                buy.totalPrice = (buy.quantity * buy.price);
            });

            angular.forEach(sells, function(sell){
                sell.sells = sell.quantity;
                sell.totalPrice = Math.floor(sell.price * .85) * sell.quantity;
            })

            transactions = buys.concat(sells);

            var deferredArray = [];

            angular.forEach(transactions, function(transaction){
                var deferred = $q.defer();
                $http.get('https://api.guildwars2.com/v2/items/' + transaction['item_id']).success(function(data, status){
                    transaction.name = data.name;
                    transaction.imgUrl = data.icon;
                    deferred.resolve();
                })
                transaction.date = new Date(transaction.purchased);
                deferredArray.push(deferred.promise);
            });

            return $q.all(deferredArray).then(function(){
                transactions.sort(function(a, b){
                    return b.date - a.date;
                })
                return transactions;
            });
        })
    }

    function getHistoricalData(){
        var sells;
        var buys;
        var transactions = [];
        var sellsDefered = $http.get('/gw2/api/tp/history/sells').success(function(data, status){
            sells = data;
        });

        var buysDefered = $http.get('/gw2/api/tp/history/buys').success(function(data, status){
            buys = data;
        })

        return $q.all([sellsDefered, buysDefered]).then(function(){
            angular.forEach(buys, function(buy){
                var found = false;
                angular.forEach(transactions, function(transaction){
                    if(transaction.bought[0]['item_id'] == buy['item_id']){
                        found = true;
                        transaction.bought.push(buy);
                    }
                })
                if(!found){
                    transactions.push({bought: [buy]});
                }
            })
            angular.forEach(sells, function(sell){
                var found = false;
                angular.forEach(transactions, function(transaction){
                    if(transaction.bought && transaction.bought[0]['item_id'] == sell['item_id']){
                        found = true;
                        if(transaction.sold){
                            transaction.sold.push(sell);
                        } else {
                            transaction.sold = [sell];
                        }
                    }
                })
                if(!found){
                    transactions.push({sold: [sell]});
                }
            });

            var deferredArray = [];

            angular.forEach(transactions, function(transaction){
                var deferred = $q.defer();
                var totalPrice = 0;
                var totalBought = 0;
                var totalSold = 0;
                angular.forEach(transaction.bought, function(buy){
                    totalPrice -= buy.price * buy.quantity;
                    totalBought += buy.quantity;
                })
                angular.forEach(transaction.sold, function(sold){
                    totalPrice += Math.floor(sold.price *.85) * sold.quantity;
                    totalSold += sold.quantity;
                })
                transaction.totalPrice = totalPrice;
                transaction.totalSold = totalSold;
                transaction.totalBought = totalBought;
                if(transaction.bought){
                    transaction['item_id'] = transaction.bought[0]['item_id'];
                } else {
                    transaction['item_id'] = transaction.sold[0]['item_id'];
                }
                $http.get('https://api.guildwars2.com/v2/items/' + transaction['item_id']).success(function(data, status){
                    transaction.name = data.name;
                    transaction.imgUrl = data.icon;
                    deferred.resolve();
                })
                deferredArray.push(deferred.promise);
            });

            return $q.all(deferredArray).then(function(){
                transactions.sort(function(a, b){
                    return b.totalPrice - a.totalPrice;
                });
                var total = 0;


                angular.forEach(transactions, function(transaction){
                    total += transaction.total;
                })
                return transactions;
            });
        });
    }
})
