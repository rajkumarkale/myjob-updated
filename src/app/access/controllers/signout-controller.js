/**
 * Created by revathi on 4/18/2016.
 */
angular.module('com.module.access').controller('SignOutFormController',['$cookies', '$cookieStore', 'AuthService','$state', 'Facebook', '$rootScope', function ($cookies, $cookieStore, AuthService, $state, Facebook, $rootScope) {
  'use strict';
  var logout = function () {
    AuthService.logout().then(function (response) {
      $state.go('access.signin');
      $cookieStore.remove('userId');
      $cookieStore.remove('userInfo');
      $cookieStore.remove('role');
      $cookieStore.remove('userName');
      $cookieStore.remove('profilePic');
      $rootScope.previousePath = null;
      Facebook.logout();
     //gapi.auth.signOut();
    }, function (error) {
    });
  };
  logout();
}]);
