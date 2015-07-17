angular.module('visualGas')
.factory('misc', [function(){
  var misc = {};
  misc.get = {};

  misc.get.type = function(object){
    var toClass = {}.toString;
    var string = toClass.call(object);
    string = string.substring(8, string.length - 1);
  }

  return misc;
}])
