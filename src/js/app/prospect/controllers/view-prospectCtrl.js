/**
 * Created by rkale on 5/20/2016.
 */
angular.module('com.module.prospect')
.controller('viewProspectCtrl',['$scope',function($scope){
  $scope.open = function($event,opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openCal=opened;

    if($scope.openCal==='opened1')
    {
      $scope.opened1 = true;
    $scope.opened2 = false;
    }
    else if($scope.openCal==='opened2')
    {
      $scope.opened2 = true;
      $scope.opened1 = false;
    }
  };


}]);

