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

  $(document).ready(function(){
    console.log($(window).width());
    if($(window).width() <= 768){
      console.log('setting css');
      $('#carousel').css('margin-left', '-15px');
      $('.navbar').removeClass('transparent');
      console.log($('#carousel').css('margin-left'));
    } else {
      $('#carousel').css('margin-left','0px');
    }
  })

  $(window).resize(function(){
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
