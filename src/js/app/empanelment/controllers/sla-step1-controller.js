/**
 * Created by kveena on 7/18/2016.
 */
angular.module('com.module.empanelment')
.controller('sla-step1-controller',['$scope','$state','appConfig','$rootScope',function($scope,$state,appConfig,$rootScope){

    $scope.OB = appConfig.empanelment.OB;
  $scope.open = function ($event, opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openCal = opened;

    if ($scope.openCal === 'opened1') {
      $scope.opened1 = true;
      $scope.opened2 ,$scope.opened3 , $scope.opened4 , $scope.opened5= false;
      
    } else if ($scope.openCal === 'opened2') {
      $scope.opened2 = true;
      $scope.opened1 ,$scope.opened3 , $scope.opened4 , $scope.opened5= false;
    }
    else if ($scope.openCal === 'opened3') {
      $scope.opened3 = true;
      $scope.opened1 ,$scope.opened2 , $scope.opened4 , $scope.opened5= false; 

    }
    else if ($scope.openCal === 'opened4') {
      $scope.opened4 = true;
      $scope.opened1 ,$scope.opened2 , $scope.opened3 , $scope.opened5= false;

    }
    else if ($scope.openCal === 'opened5') {
      $scope.opened5 = true;
      $scope.opened1 ,$scope.opened2 , $scope.opened4 , $scope.opened4= false;

    }
  };

}]);
