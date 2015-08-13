var mainApp = angular.module('mainApp');

mainApp.controller('navCtrl', function($rootScope, $scope){
});

mainApp.controller('homeCtrl', function($rootScope, $scope, $anchorScroll, projects, backgroundImage){

  $scope.recentProjects = projects.data.slice(0,3);

  $scope.interval = 2500;
  $scope.slides = [{text: 'Javascript'},
                   {text: 'C'},
                   {text: 'C++'},
                   {text: 'HTML'},
                   {text: 'AngularJS'},
                   {text: 'Verilog'},
                   {text: 'Android'},
                   {text: 'NodeJS'},
                   {text: 'Java'},
                   {text: 'Github'},
                   {text: 'Arduino'},
                   {text: 'Raspberry Pi'},
                   {text: 'Bootstrap'},
                   {text: 'PCB Design'}];

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

    if($(document).scrollTop() > $('#mainJumbotron').outerHeight() - $('#navBar').outerHeight()){
      if($(window).width() >= 787)  $('#navBar').removeClass('transparent');
    } else {
      if($(window).width() >= 787)  $('#navBar').addClass('transparent');
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

mainApp.controller('projectsCtrl', function($scope, projects, $anchorScroll, $location, $stateParams){

  if($stateParams.filterBy){
    $scope.tagSearch = $stateParams.filterBy;
  }

  $scope.scrollTo = function(id){
    $location.hash(id);
    $anchorScroll();
  };
  
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
  $scope.projects = projects.data;
  angular.forEach($scope.projects, function(project){
    var dateString = new Date(project.published);
    project.dateString = dateString.toLocaleDateString();
    project.date = new Date(project.published);
  });
  var max = projects.data.length - 1;
  var min = 0;
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  $scope.main = projects.data[ranNum];
});
