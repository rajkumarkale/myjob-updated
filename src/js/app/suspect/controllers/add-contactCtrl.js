/**
 * Created by rkale on 6/3/2016.
 */
angular.module('com.module.suspect')
  .controller('addContactCtrl',function ($scope, $modalInstance)
  {
    $scope.ok = function ()
    {
      $modalInstance.close();
    };
    $scope.cancel = function ()
    {
      $modalInstance.dismiss();
    }
  });
