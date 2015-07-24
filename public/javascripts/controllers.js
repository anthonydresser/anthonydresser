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
    var max = 7;
    var min = 1;
    console.log($(window).width());
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    $('#mainJumbotron').css('background-image', 'url("/images/front_' + ranNum + '.png")');
    if(ranNum === 1){
      $('#credit').hide();
    }
    console.log("jumbo height: " + $('#mainJumbotron').height());
    console.log("carousel height: " + $('#carousel').height());
    $('#credit').css('margin-top', $('#mainJumbotron').height() - $('#carousel').height() - $('#navbar').height());
    if($(window).width() <= 768){
      console.log('setting css');
      $('#carousel').css('margin-left', '-15px');
      $('.navbar').removeClass('transparent');
      console.log($('#carousel').css('margin-left'));
    } else {
      $('#carousel').css('margin-left','0px');
    }
  })

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
    console.log("jumbo height: " + $('#mainJumbotron').height());
    console.log("carousel height: " + $('#carousel').height());
    $('#credit').css('margin-top', $('#mainJumbotron').height() - $('#carousel').height() - $('#navbar').height());

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
