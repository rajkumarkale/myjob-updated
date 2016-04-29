angular.module('com.module.user').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'app/user/views/app.html',
      resolve: {
        auth: ['$q', 'AuthService', function ($q, AuthService) {
          var userInfo = AuthService.getUserInfo();
          if (userInfo) {
            return $q.when(userInfo);
          }
          else {
            return $q.reject({authenticated: false});
          }
        }]
      }
    })
    .state('app.changePassword', {
      url: '/changePassword',
      templateUrl: 'js/app/user/views/change-password.html' ,
      data :{
        title:'Change Password'
      }
    })
    .state('app.changeProfilePic', {
      url: '/changeProfilePic',
      templateUrl: 'js/app/user/views/change-profile-picture.html' ,
      data :{
        title:'Change Profile Picture'
      }
    })
    .state('app.paypal', {
      url: '/paypal',
      templateUrl: 'js/app/user/views/paypal.html' ,
      data :{
        title:'Paypal'
      }
    })
    .state('app.user', {
      url: '/user/dashboard',
      templateUrl: 'js/app/user/views/dashboard.html',
      data :{
        title:'Dashboard'
      }
    })
}]);
