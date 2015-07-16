var visualgas = angular.module('visualGas');

visualgas.directive('d3Graph', ['d3Service', '$window', function(d3Service, $window){
  return {
    restrict: 'EA',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3){
        var margin = parseInt(attrs.margin) || 20,
        graphHeight = parseInt(attrs.barHeight) || 20,
        graphPadding = parseInt(attrs.barPadding) || 5;
        var svg = d3.select(element[0])
        .append("svg")
        .style('width', '100%')
        .style('height', '100%');

        $window.onresize = function() {
          scope.$apply();
        }

        scope.$watch(function(){
          return angular.element($window)[0].innerWidth;
        }, function(){
          scope.render(scope.data);
        });

        scope.$watch('data', function(newVals, oldVals){
          return scope.render(newVals);
        }, true);

        var toClass = {}.toString;

        scope.render = function(data) {

          svg.selectAll('*').remove();

          if(!data) return;

          var width = d3.select(element[0])[0][0].offsetWidth - margin,

          height = graphHeight + graphPadding,

          xRange,

          yRange = d3.scale.linear().range([20, height + 20]).domain([d3.max(data, function(d){
            return d.y;
          }), d3.min(data, function(d){
            return d.y;
          })]);

          if(toClass.call(data[0].x).indexOf('Date') > -1) {
            xRange = d3.time.scale().range([60, width]).domain([d3.min(data, function(d){
              return d.x;
            }), d3.max(data, function(d){
              return d.x;
            })]);
          } else {
            xRange = d3.scale.linear().range([60, width]).domain([d3.min(data, function(d){
              return d.x;
            }), d3.max(data, function(d){
              return d.x;
            })]);
          }

          xAxis = d3.svg.axis()
          .scale(xRange)
          .tickSize(5)
          .tickSubdivide(true),

          yAxis = d3.svg.axis()
          .scale(yRange)
          .tickSize(5)
          .orient('left')
          .tickSubdivide(true);

          svg.append('svg:g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + (height + 20) + ')')
          .call(xAxis);

          svg.append('svg:g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(60,0)')
          .call(yAxis);

          var lineFunc = d3.svg.line()
          .x(function(d){
            return xRange(d.x);
          })
          .y(function(d){
            return yRange(d.y);
          })
          .interpolate('basic');

          svg.append('svg:path')
          .attr('d', lineFunc(data))
          .attr('stroke', 'blue')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
        }

      });
    }
  };
}])
