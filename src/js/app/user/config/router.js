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
        }],
        profile: [ 'AuthService', function ( AuthService) {
          return  AuthService.getProfile();
        }],
        invoices: ['AuthService', function (AuthService){
          return  AuthService.getInvoices();
        }]
      }
    })

    .state('app.dashboard', {
      url: '/dashboard',
      templateUrl: 'js/app/user/views/dashboard.html',
      data :{
        title:'Dashboard'
      }
    }).state('app.profile', {
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
}]);
