/**
 * Created by rkale on 5/20/2016.
 */
angular.module('com.module.prospect')
.controller('viewProspectCtrl',['$scope',function($scope){
  $scope.open = function($event,opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope[opened] = true;
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

}]);
