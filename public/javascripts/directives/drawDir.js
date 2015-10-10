angular.module('mainApp').directive("drawing", function(){
    return {
        restrict: "A",
        link: function(scope, element){
            var ctx = element[0].getContext('2d');
            var circleSize = 10.25;

            //// variable that decides if something should be drawn on mousemove
            //var drawing = false;
            //
            //// the last coordinates before the current move
            //var lastX;
            //var lastY;

            scope.drawBoard = function(x, y){
                console.log('drawing board',x,y);
                ctx.clearRect(0, 0, element[0].width, element[0].height);
                console.log(element[0].width, element[0].width/x, Math.floor(element[0].width/x));
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

            //element.bind('mousedown', function(event){
            //    if(event.offsetX!==undefined){
            //        lastX = event.offsetX;
            //        lastY = event.offsetY;
            //    } else { // Firefox compatibility
            //        lastX = event.layerX - event.currentTarget.offsetLeft;
            //        lastY = event.layerY - event.currentTarget.offsetTop;
            //    }
            //
            //    // begins new line
            //    ctx.beginPath();
            //
            //    drawing = true;
            //});
            //element.bind('mousemove', function(event){
            //    if(drawing){
            //        // get current mouse position
            //        if(event.offsetX!==undefined){
            //            currentX = event.offsetX;
            //            currentY = event.offsetY;
            //        } else {
            //            currentX = event.layerX - event.currentTarget.offsetLeft;
            //            currentY = event.layerY - event.currentTarget.offsetTop;
            //        }
            //
            //        draw(lastX, lastY, currentX, currentY);
            //
            //        // set current coordinates to last one
            //        lastX = currentX;
            //        lastY = currentY;
            //    }
            //
            //});
            //element.bind('mouseup', function(event){
            //    // stop drawing
            //    drawing = false;
            //});
            //
            //// canvas reset
            //function reset(){
            //    element[0].width = element[0].width;
            //}
            //
            //function draw(lX, lY, cX, cY){
            //    // line from
            //    ctx.moveTo(lX,lY);
            //    // to
            //    ctx.lineTo(cX,cY);
            //    // color
            //    ctx.strokeStyle = "#4bf";
            //    // draw it
            //    ctx.stroke();
            //}
        }
    };
});