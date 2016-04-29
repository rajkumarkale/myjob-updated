angular.module('com.module.access').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('access', {
      url: '/access',
      template: '<div ui-view class="fade-in-right-big smooth"></div>',
      controller:['$cookies', '$state', '$location' ,'$rootScope', '$window', '$timeout', function ($cookies,$state,$location,$rootScope, $window, $timeout){
        if($cookies.userInfo) {
          if($rootScope.previousePath){
            $timeout(function(){
              $window.location.href = $location.$$absUrl.split('#')[0]+'#'+$rootScope.previousePath;
            },1000);
          }else {
            $state.go('app.operations.dashboard');
          }
        }
      }]
    })
    .state('access.signin', {
      url: '/sign-in',
      templateUrl: 'app/access/views/sign-in.html',
      data :{
        title:'Sign in'
      }
    })
    .state('access.signup', {
      url: '/sign-up',
      templateUrl: 'app/access/views/sign-up.html',
      data :{
        title:'Sign up'
      }
    })
    .state('access.forgotpwd', {
      url: '/forgot-password',
      templateUrl: 'app/access/views/forgot-password.html',
      data :{
        title:'Forgot password'
      }
    })
    .state('access.resendVerification', {
      url: '/resend-verification',
      templateUrl: 'app/access/views/resend-verification.html',
      data :{
        title:'Resend Verification'
      }
    })
    .state('access.signout', {
      url: '/sign-out',
      controller: 'SignOutFormController',
      data :{
        title:'Sign out'
      }
    });
}]);
