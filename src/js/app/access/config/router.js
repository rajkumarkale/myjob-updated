angular.module('com.module.access').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('access', {
      abstract:true,
      templateUrl:'js/app/access/views/app.html',
      controller:['$cookies','appConfig','$location', '$scope', function ($cookies,appConfig,$location,$scope){
        $scope.backgroundImageDisplay = true;
        if($cookies.userInfo) {
          $location.path(appConfig.loginRedirect);
        }
      }]
    })
    .state('access.signin', {
      url: '/sign-in',
      templateUrl: 'js/app/access/views/sign-in.html',
      data :{
        title:'Sign in'
      }
    })
    .state('access.forgotpwd', {
      url: '/forgot-password',
      templateUrl: 'js/app/access/views/forgot-password.html',
      data :{
        title:'Forgot password'
      }
    })
    .state('access.signout', {
      url: '/sign-out',
      controller: 'SignInFormController',
      data :{
        title:'Sign out'
      }
    })
    .state('access.resetpwd', {
      url: '/reset/:token',
      templateUrl: 'js/app/access/views/reset-password.html',
      controller: 'SignInFormController',
      data :{
        title:'Reset password'
      }
    }
    );
}]);
