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

        scope.render = function(data) {

          svg.selectAll('*').remove();

          if(!data) return;


          var width = d3.select(element[0])[0][0].offsetWidth - margin,
          height = graphHeight + graphPadding,
          xRange = d3.scale.linear().range([10, width]).domain([0, data.length]),
          yRange = d3.scale.linear().range([0, height - 10]).domain([d3.min(data, function(d){
            return d.y;
          }), d3.max(data, function(d){
            return d.y;
          })]);
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
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

          svg.append('svg:g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(50,0)')
            .call(yAxis);
          // color = d3.scale.category20(),
          // xScale = d3.scale.linear()
          // .domain([0, d3.max(data, function(d){
          //   return d.score;
          // })])
          // .range([0, width]);

            // svg.attr('height', height);
            //
            // svg.selectAll('rect')
            // .data(data).enter()
            // .append('rect')
            // .attr('height', barHeight)
            // .attr('width', 140)
            // .attr('x', Math.round(margin/2))
            // .attr('y', function(d, i){
            //   return i * (barHeight + barPadding);
            // })
            // .attr('fill', function(d) { return color(d.score); })
            // .transition()
            // .duration(1000)
            // .attr('width', function(d) {
            //   return xScale(d.score);
            // })
        }

      });
    }
  };
}])
