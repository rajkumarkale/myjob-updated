/**
 * Created by rkale on 6/28/2016.
 */
angular.module('com.module.prospect')
  .controller('shareCtrl',function ($scope,$modalInstance) {
  $scope.ok=function () {
    $modalInstance.close();
    }
    $scope.cancel=function () {
      $modalInstance.dismiss();
    }
    
  });
