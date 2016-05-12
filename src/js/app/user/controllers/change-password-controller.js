angular.module('com.module.user').controller('changePasswordModalInstanceCtrl', ['$scope', '$modalInstance','AuthService','$state',
  function ($scope,$modalInstance, AuthService,$state) {
  'use strict';
  $scope.changePassword = function (formData) {
    AuthService.changePassword(formData).success(function () {
      toaster.pop('Success','Password updated successfully.');
      $modalInstance.dismiss('cancel');
    }).error(function (err) {
      $scope.authError = err.message;
      toaster.pop('Fail','Password updating failed.');
    })
  };
  $scope.cancel = function(){
    $modalInstance.dismiss('cancel');
  };
}]);
