angular.module('com.module.user').controller('changePasswordController', ['$scope','AuthService','$state',function ($scope, AuthService,$state) {
  'use strict';
  $scope.formData = {};
  $scope.changePassword = function () {
    AuthService.changePassword({
      userId: $scope.user.id,
      oldPassword: $scope.formData.oldPassword,
      newPassword: $scope.formData.newPassword
    }).success(function () {
      $scope.common.toastSuccess('Success','Password updated successfully.');
      AuthService.logout().success(function (data){
        $state.go('access.signin');
      }).error(function (err) {
        $scope.common.toastWarning('Fail','Password updating failed.');
      })
    }).error(function (err) {
      $scope.authError = err.message;
      $scope.common.toastWarning('Fail','Password updating failed.');
    })
  }
}]);
