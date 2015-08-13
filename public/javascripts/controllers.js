var mainApp = angular.module('mainApp');

mainApp.controller('navCtrl', function($rootScope, $scope){
});

mainApp.controller('homeCtrl', function($rootScope, $scope, $anchorScroll, projects, backgroundImage){

  $scope.recentProjects = projects.data.slice(0,3);

  $scope.interval = 2500;
  $scope.slides = [
    {
      text: 'Javascript',
      link: 'JavaScript'
    },
    {
      text: 'C',
      link: 'C'
    },
    {
      text: 'C++',
      link: 'C++'
    },
    {
      text: 'HTML',
      link: 'HTML'
    },
    {
      text: 'AngularJS',
      link: 'AngularJS'
    },
    {
      text: 'Verilog',
      link: ''
    },
    {
      text: 'Android',
      link: ''
    },
    {
      text: 'NodeJS',
      link: ''
    },
    {
      text: 'Java',
      link: ''
    },
    {
      text: 'Github',
      link: ''
    },
    {
      text: 'Arduino',
      link: ''
    },
    {
      text: 'Raspberry Pi',
      link: ''
    },
    {
      text: 'Bootstrap',
      link: ''
    },
    {
      text: 'PCB Design',
      link: ''
    }];

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

mainApp.controller('projectsCtrl', function($scope, projects, $anchorScroll, $location, $stateParams){

  if($stateParams.filterBy){
    $scope.tagSearch = $stateParams.filterBy;
  }

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
  var max = projects.data.length - 1;
  var min = 0;
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  $scope.main = projects.data[ranNum];
});
