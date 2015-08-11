var mainApp = angular.module('mainApp');

mainApp.controller('navCtrl', function($rootScope, $scope){
  angular.element(document).ready(function(){
    if($(window).width() <= 766){
      $('#dropDown').addClass('navDropDown');
      $rootScope.smallScreen = true;
    } else {
      $('#dropDown').removeClass('navDropDown');
      $rootScope.smallScreen = false;
    }
  });

  $(window).resize(function(){
    if($(window).width() <= 766){
      if(!$scope.scrolled)  $('#dropDown').addClass('navDropDown');
      $rootScope.smallScreen = true;
    } else {
      $('#dropDown').removeClass('navDropDown');
      $rootScope.smallScreen = false;
    }
  });

  $(document).on('scroll', function(){
    console.log('scroll');
    console.log($(document).scrollTop());
    console.log($('#mainJumbotron').outerHeight() - $('#navBar').outerHeight());
    if($(document).scrollTop() > $('#mainJumbotron').outerHeight() - $('#navBar').outerHeight()){
      $scope.scrolled = true;
      $('#navBar').removeClass('transparent');
      if($rootScope.smallScreen)  $('#dropDown').removeClass('navDropDown');
    } else {
      $scope.scrolled = false;
      $('#navBar').addClass('transparent');
      if($rootScope.smallScreen)  $('#dropDown').addClass('navDropDown');
    }
  });
});

mainApp.controller('homeCtrl', function($rootScope, $scope, $anchorScroll, projects, backgroundImage){

  $scope.recentProjects = projects.data.slice(0,3);
  console.log('background image', backgroundImage);

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

  angular.element(document).ready(function(){
    $('#mainJumbotron').css('background-image', 'url(' + backgroundImage.img + ')');
    if(backgroundImage.credit){
      $('#credit').show();
    } else {
      $('#credit').hide();
    }
    if($(window).width() <= 768){
      $('#carousel').css('margin-left', '-15px');
    } else {
      $('#carousel').css('margin-left','0px');
    }
  });

  $(document).on('scroll', function(){
    if($(document).scrollTop() > $('#mainJumbotron').outerHeight() - $('#navBar').outerHeight()){
      if($(window).width() >= 787)  $('#navBar').removeClass('transparent');
    } else {
      if($(window).width() >= 787)  $('#navBar').addClass('transparent');
    }
  });

  $(window).resize(function(){
    if($(window).width() <= 768){
      $('#carousel').css('margin-left', '-15px');
    } else {
      $('#carousel').css('margin-left', '0px');
    }
  });
});

mainApp.controller('projectsCtrl', function($scope, projects, $anchorScroll, $location){
  angular.element(document).ready(function(){
    if($(window).outerWidth() <= 992){
      $('#rightCol').hide();
    } else {
      $('#rightCol').show();
    }
  });

  $(window).resize(function(){
    if($(window).outerWidth() <= 992){
        $('#rightCol').hide();
    } else {
      $('#rightCol').show();
    }
  });
  $scope.scrollTo = function(id){
    $location.hash(id);
    $anchorScroll();
  };
  $scope.projects = projects.data;
  angular.forEach($scope.projects, function(project){
    var dateString = new Date(project.published);
    project.dateString = dateString.toLocaleDateString();
    project.date = new Date(project.published);
  });
  console.log($scope.projects);
  var max = projects.data.length - 1;
  var min = 0;
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(ranNum);
  $scope.main = projects.data[ranNum];
});
