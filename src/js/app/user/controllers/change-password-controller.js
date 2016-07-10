angular.module('com.module.user').controller('changePasswordModalInstanceCtrl', ['$scope', '$modalInstance','AuthService','CoreService','$state',
  function ($scope,$modalInstance, AuthService,CoreService,$state) {
  'use strict';
  $scope.changePassword = function (formData) {
    AuthService.changePassword(formData).then(function (response) {
      $modalInstance.close(response);
    },function (err) {
      $scope.authError = err.message;
        $modalInstance.close();
      CoreService.toastError('','Password updating failed.');
    });
  };
  $scope.cancel = function(){
    $modalInstance.dismiss('cancel');
  };
}]);
