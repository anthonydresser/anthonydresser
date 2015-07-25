(function(){
  var mainApp = angular.module('mainApp');

  mainApp.controller('indexCtrl', function($scope){

    $scope.interval = 2500;
    $scope.slides = [{text: 'Javascript'},
                     {text: 'C'},
                     {text: 'C++'},
                     {text: 'HTML'},
                     {text: 'Angular'},
                     {text: 'Verilog'},
                     {text: 'Android'},
                     {text: 'NodeJS'},
                     {text: 'Java'},
                     {text: 'Github'},
                     {text: 'Arduino'},
                     {text: 'Raspberry Pi'},
                     {text: 'Bootstrap'}];
    var didScroll = false;

    $(document).ready(function(){
      var max = 8;
      var min = 1;
      var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
      $('#mainJumbotron').css('background-image', 'url("/images/front_' + ranNum + '.png")');
      if(ranNum === 1){
        $('#credit').hide();
      } else {
        $('#credit').show();
      }
      $('#credit').css('width', $('#credit').children().innerWidth());
      $('#credit').css('margin-left', $(window).innerWidth() - $('#credit').children().innerWidth() - 10);
      $('#credit').css('margin-top', $('#mainJumbotron').height() - $('#carousel').innerHeight() - $('#navBar').innerHeight() - 10);
      if($(window).width() <= 768){
        $('#carousel').css('margin-left', '-15px');
        $('#navBar').removeClass('transparent');
      } else {
        $('#carousel').css('margin-left','0px');
      }
    });

    $(document).on('scroll', function(){
      if($(document).scrollTop() > $('#mainJumbotron').outerHeight() - $('#navBar').outerHeight()){
        $('#navBar').removeClass('transparent');
      } else {
        $('#navBar').addClass('transparent');
      }
    })

    $(window).resize(function(){
      $('#credit').css('margin-left', $(window).innerWidth() - $('#credit').children().innerWidth() - 10);
      $('#credit').css('margin-top', $('#mainJumbotron').height() - $('#carousel').innerHeight() - $('#navBar').innerHeight() - 10);

      if($(window).width() <= 768){
        $('#carousel').css('margin-left', '-15px');
        $('#navBar').removeClass('transparent');
      } else {
        $('#carousel').css('margin-left', '0px');
        $('#navBar').addClass('transparent');
      }
    })
  })

  mainApp.controller('projectsCtrl', function(){

  })
})();
