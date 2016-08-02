angular.module('com.module.access').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('access', {
      url: '/access',
      abstract:true,
      templateUrl:'js/app/access/views/app.html',
      controller:['$cookies','appConfig','$location', '$scope', function ($cookies,appConfig,$location,$scope){
        $scope.backgroundImageDisplay = true;
        if($cookies.get('userData')) {
          $location.path(appConfig.loginRedirect);
        }
      }]
    })
    .state('access.signin', {
      url: '/sign-in',
      templateUrl: 'js/app/access/views/sign-in.html',
      data :{
        title:'Sign in'
      },
      controller : 'SignInFormController'
    })
    .state('access.signin.reset-password', {
      url: '/reset-password',
      data :{
        title:'Reset Password'
      },
      controller: ['$modal', function ($modal){
        console.log('happy');
        var modalInstance = $modal.open({
          templateUrl: 'js/app/access/views/reset-password.html',
          backdrop: 'static',
          controller: 'resetPasswordController',
          size: 'md'
        });
        modalInstance.result.then(function () {
        });
      }],
      template:'<div></div>'

    })
    .state('access.forgotpwd', {
      url: '/forgot-password',
      templateUrl: 'js/app/access/views/forgot-password.html',
      data :{
        title:'Forgot password'
      }
    })
    ;
}]);
