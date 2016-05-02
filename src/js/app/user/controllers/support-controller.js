angular.module('com.module.user')
  .controller('supportController', ['$scope', 'AuthService','$modalInstance', function ($scope, AuthService,$modalInstance) {
    $scope.supportData = {
      email: $scope.user.email,
      message: ''
    };
    $scope.updateSupport = function () {
      AuthService.updateSupport($scope.supportData).then(function (){
        $scope.common.toastSuccess('Success', 'Your request sent successfully.');
        $modalInstance.close();
      });
    };
  }]);
