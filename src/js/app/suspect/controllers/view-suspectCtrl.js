/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
  .controller('viewSuspectCtrl',['$scope',function($scope){
    $scope.open = function($event,opened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope[opened] = true;
    };
  }]);
