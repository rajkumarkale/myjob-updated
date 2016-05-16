angular.module('com.module.possibility').controller('createClientModalInstanceCtrl', ['$scope', '$modalInstance',
  function ($scope,$modalInstance) {
  'use strict';
  $scope.createClient = function (formData) {
    clientCreationService.createClient(formData).success(function () {
      toaster.pop('Success','Created Client successfully.');
      $modalInstance.dismiss('cancel');
    }).error(function (err) {
      $scope.authError = err.message;
      toaster.pop('Fail','Failed to Create Client.');
    })
  };
  $scope.cancel = function(){
    $modalInstance.dismiss('cancel');
  };
}]);
