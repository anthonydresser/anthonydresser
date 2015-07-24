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
      console.log($('#mainJumbotron').innerHeight());
      console.log($('#carousel').innerHeight());
      console.log($('#navbar').innerHeight());
      console.log($('#mainJumbotron').css('padding-top'));
      console.log($('#mainJumbotron').css('padding-bottom'));
      $('#credit').css('width', $('#credit').children().innerWidth());
      $('#credit').css('margin-left', $(window).innerWidth() - $('#credit').children().innerWidth() - 10);
      $('#credit').css('margin-top', $('#mainJumbotron').height() - $('#carousel').innerHeight() - $('#navbar').innerHeight());
      if($(window).width() <= 768){
        $('#carousel').css('margin-left', '-15px');
        $('.navbar').removeClass('transparent');
      } else {
        $('#carousel').css('margin-left','0px');
      }
    });

    $(window).scroll(function(){
      if(!didScroll){
        didScroll = true;

        console.log('Jumbo Height ' + $('.mainJumbotron').height());
        console.log('Scroll Dist ' + $(document).scrollTop());

        if($(document).scrollTop() >= $('#mainJumbotron').height()){
          console.log('Would transition');
        }
        didScroll = false;
      }
    }, false)

    $(window).resize(function(){
      $('#credit').css('margin-left', $(window).innerWidth() - $('#credit').children().innerWidth() - 10);
      $('#credit').css('margin-top', $('#mainJumbotron').height() - $('#carousel').innerHeight() - $('#navbar').innerHeight());

      if($(window).width() <= 768){
        $('#carousel').css('margin-left', '-15px');
        $('.navbar').removeClass('transparent');
      } else {
        $('#carousel').css('margin-left', '0px');
        $('.navbar').addClass('transparent');
      }
    })
  })

  mainApp.controller('projectsCtrl', function(){

  })
})();
