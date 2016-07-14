angular.module('com.module.user').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app', {
      url: '/app',
      templateUrl: 'js/app/user/views/app.html',
      controller:'appController',
      resolve: {
        user: [ 'AuthService', function ( AuthService) {
          return  AuthService.getUserInfo();
        }]
      }
    })

    .state('app.dashboard', {
      url: '/dashboard',
      templateUrl: 'js/app/user/views/dashboard.html',
      controller : 'dashboardController',
      data :{
        title:'Dashboard'
      }
    })
    .state('app.profile', {
      url: '/profile',
      templateUrl: 'js/app/user/views/profile.html',
      controller:'profileController',
      data :{
        title:'Profile'
      },
      resolve: {
        profile: [ 'AuthService', function ( AuthService) {
          return  AuthService.getProfile();
        }],
        countries: [ 'AuthService', function ( AuthService) {
          return  AuthService.getCountries();
        }]
      }
    })
    .state('app.boardadmin', {
      url: '/dashboard-admin',
      templateUrl: 'js/app/user/views/admin-dashboard.html',
      controller:'dashboard',
      data :{
        title:'Dashboard'
      }
    });
}]);
