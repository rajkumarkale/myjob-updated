/**
 * Created by revathi on 4/18/2016.
 */
angular.module('com.module.access').controller('SignUpFormController',['$scope', 'toaster', '$location', 'AuthService', 'appConfig', function ($scope, toaster, $location, AuthService, appConfig) {
  'use strict';
  var emailVerification = function (data) {
    AuthService.getEmailVerification({
      'email_id': data
    }).then(function (response) {
      toaster.pop(response, 'Resent email,Please verify to login');
    }).error(function (response) {
      toaster.pop(response, 'Error while sending email.');
    });
  };
  $scope.signUp = function (user) {
    $scope.myPromise = AuthService.signUp({
      'device_id': appConfig.device_id,
      'platform': appConfig.platform,
      'name': user.name,
      'push_id': 'APA91bHqeZdXXFCtkGh',
      'accounts': [
        {
          'provider': 'EMAIL',
          'email_id': user.email,
          'password': user.password
        }],
      'role': 'artist'
    }).then(function (response) {
      $scope.isCollapsed = false;
      //$scope.authError = false;
      toaster.pop('success', 'Sent Email, Please verify to Login.');
      $scope.hide = true;
      //$location.path(appConfig.appRoot);
      $scope.user = "";
    }, function (error) {
      $scope.authError = true;
      $scope.isCollapsed = true;
      $scope.authError = error.data.error;
    });
  };
}]);
