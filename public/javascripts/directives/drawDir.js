angular.module('mainApp').directive("drawing", function(){
    return {
        restrict: "A",
        link: function(scope, element){
            var ctx = element[0].getContext('2d');
            var circleSize = 10;

            //// variable that decides if something should be drawn on mousemove
            //var drawing = false;
            //
            //// the last coordinates before the current move
            //var lastX;
            //var lastY;

            scope.drawBoard = function(){
                for(var j = 0; j < 6; j++){
                    console.log('j equals', j);
                    for(var i = 0; i < 7; i++){
                        console.log('i equals', i);
                        ctx.beginPath();
                        ctx.arc(((i*circleSize)*2)+circleSize,((j*circleSize)*2)+circleSize,circleSize,0,2*Math.PI);
                        ctx.stroke();
                    }
                }
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