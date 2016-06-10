angular.module('com.module.access').controller('SignOutFormController',['$cookieStore', 'AuthService', function ($cookieStore, AuthService) {
  'use strict';
  var logout = function () {
    AuthService.logout().then(function (response) {
      console.log(response);
      $cookieStore.remove('userData');
      $location.path('/access/signin');
    }, function (error) {
      console.log(error);
    });
  };
  logout();
}]);
