var mainApp = angular.module('mainApp');

mainApp.controller('homeCtrl', function($rootScope, $scope){

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
    $('#contact').css('margin-top', $('#mainJumbotron').height() - $('#carousel').innerHeight() - $('#navBar').innerHeight() - $('#contact').height());
    $('#credit').css('width', $('#credit').children().innerWidth());
    $('#credit').css('margin-left', $(window).innerWidth() - $('#credit').children().innerWidth() - 10);
    $('#credit').css('margin-top', $('#mainJumbotron').height() - $('#carousel').innerHeight() - $('#navBar').innerHeight() - $('#credit').height());
    if($(window).width() <= 768){
      $('#carousel').css('margin-left', '-15px');
      $('#navBar').removeClass('transparent');
      $rootScope.smallScreen = true;
    } else {
      $('#carousel').css('margin-left','0px');
      $('#navBar').addClass('transparent');
      $rootScope.smallScreen = false;
    }
  });

  $(document).on('scroll', function(){
    if($(document).scrollTop() > $('#mainJumbotron').outerHeight() - $('#navBar').outerHeight()){
      if($(window).width() >= 787)  $('#navBar').removeClass('transparent');
    } else {
      if($(window).width() >= 787)  $('#navBar').addClass('transparent');
    }
  })

  $(window).resize(function(){
    $('#contact').css('margin-top', $('#mainJumbotron').height() - $('#carousel').innerHeight() - $('#navBar').innerHeight() - $('#contact').height());
    $('#credit').css('width', $('#credit').children().innerWidth());
    $('#credit').css('margin-left', $(window).innerWidth() - $('#credit').children().innerWidth() - 10);
    $('#credit').css('margin-top', $('#mainJumbotron').height() - $('#carousel').innerHeight() - $('#navBar').innerHeight() - $('#credit').height());

    if($(window).width() <= 768){
      $('#carousel').css('margin-left', '-15px');
      $('#navBar').removeClass('transparent');
      $rootScope.smallScreen = true;
    } else {
      $('#carousel').css('margin-left', '0px');
      $('#navBar').addClass('transparent');
      $rootScope.smallScreen = false;
    }
  });
})

mainApp.controller('projectsCtrl', function($scope, projects){
  $scope.projects = projects.data;
  var max = projects.data.length - 1;
  var min = 0;
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(ranNum)
  $scope.main = projects.data[ranNum];
})
