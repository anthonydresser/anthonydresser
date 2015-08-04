var mainApp = angular.module('mainApp');

mainApp.controller('homeCtrl', function($rootScope, $scope, $anchorScroll, projects){

  console.log(projects);
  $scope.recentProjects = projects.data.slice(0,2);
  console.log($scope.recentProjects);

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

mainApp.controller('projectsCtrl', function($scope, projects, $anchorScroll, $location){
  $(document).ready(function(){
    if($(window).outerWidth() <= 992){
      $('#rightCol').hide();
    } else {
      $('#rightCol').show();
    }
  })

  $(window).resize(function(){
    if($(window).outerWidth() <= 992){
        $('#rightCol').hide();
    } else {
      $('#rightCol').show();
    }
  })
  $scope.scrollTo = function(id){
    $location.hash(id);
    $anchorScroll();
  }
  $scope.projects = projects.data;
  angular.forEach($scope.projects, function(project){
    var dateString = new Date(project.published);
    project.dateString = dateString.toLocaleDateString();
    project.date = new Date(project.published);
  })
  console.log($scope.projects);
  var max = projects.data.length - 1;
  var min = 0;
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(ranNum)
  $scope.main = projects.data[ranNum];
})
