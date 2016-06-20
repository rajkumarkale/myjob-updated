angular.module('com.module.possibility').controller('createClientModalInstanceCtrl', ['$scope', '$modalInstance','possibilityCreateService','toaster','$state',
  function ($scope,$modalInstance,possibilityCreateService,toaster,$state) {
  'use strict';
  $scope.createClient = function (formData) {
    console.log(formData);
    possibilityCreateService.createClient(formData).success(function () {
      toaster.pop('Success','Created Client successfully.');
      $modalInstance.dismiss('cancel');
    }).error(function (err) {
      $scope.authError = err.message;
      toaster.pop('Fail','Failed to Create Client.');
    });
  };
  $scope.cancel = function(){
    $modalInstance.dismiss('cancel');
  };
      $scope.ok = function(){
          $state.go('app.viewPossibility');
    $modalInstance.close();
  };
}]);
