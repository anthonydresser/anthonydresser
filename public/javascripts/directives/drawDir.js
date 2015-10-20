angular.module('mainApp').directive("drawing", function(){
    return {
        restrict: "A",
        link: function(scope, element){
            var ctx = element[0].getContext('2d');
            var circleSize = 10.25;

            scope.drawBoard = function(x, y){
                ctx.clearRect(0, 0, element[0].width, element[0].height);
                circleSize = Math.min(element[0].width/x, element[0].height/y)/2;
                for(var j = 0; j < y; j++){
                    for(var i = 0; i < x; i++){
                        ctx.beginPath();
                        ctx.arc(((i*circleSize)*2)+circleSize, ((j*circleSize)*2)+circleSize,circleSize, 0, 2 * Math.PI);
                        ctx.stroke();
                    }
                }
            }

            element.bind('click', function(event){
                if(scope.finishedFlag != 1) {
                    var x = Math.floor(event.offsetX / (circleSize * 2));
                    var y = Math.floor(event.offsetY / (circleSize * 2));
                    scope.move(x);
                }
            })

            scope.finished = function(){
                scope.finishedFlag = 1;
                ctx.fillStyle = 'blue';
                ctx.font = 'bold 24px Arial';
                ctx.fillText("Game Over!", 100, 100);
            }

            scope.addPiece = function(color, x, y){
                ctx.beginPath();
                ctx.arc(((x*circleSize)*2)+circleSize, ((y*circleSize)*2)+circleSize, circleSize,0,2*Math.PI);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.stroke();
            }
        }
    };
});