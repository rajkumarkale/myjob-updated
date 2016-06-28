angular.module('com.module.user').controller('changePasswordModalInstanceCtrl', ['$scope', '$modalInstance','AuthService','CoreService','$state',
  function ($scope,$modalInstance, AuthService,CoreService,$state) {
  'use strict';
  $scope.changePassword = function (formData) {
    AuthService.changePassword(formData).success(function (response) {
      $modalInstance.close(response);
    }).error(function (err) {
      $scope.authError = err.message;
      toaster.pop('Fail','Password updating failed.');
    });
  };
  $scope.cancel = function(){
    $modalInstance.dismiss('cancel');
  };
}]);
