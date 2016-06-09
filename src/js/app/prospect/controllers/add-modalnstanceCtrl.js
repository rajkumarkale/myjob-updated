/**
 * Created by rkale on 5/25/2016.
 */

angular.module('com.module.prospect')
  .controller('ModalInstanceCtrl',function ($scope, $modalInstance)
  {
    $scope.ok = function ()
    {
      $modalInstance.close();
    };

    $scope.cancel = function ()
    {
      $modalInstance.dismiss();
    };
    });

