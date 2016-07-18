/**
 * Created by revathi bandi on 5/11/2016.
 */
var app=angular.module('com.module.empanelment')
  .controller('empanelmentController',['$scope','$state','appConfig',function($scope,$state,appConfig){
      $scope.init = function($stateParams) {
            $scope.pricingMode = appConfig.empanelment.pricingMode;
            $scope.creditTerm = appConfig.empanelment.creditTerm;
            $scope.OB=appConfig.empanelment.OB;

      };
    $scope.init();
    $scope.open = function ($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened1 = !$scope.opened1;
    };
    $scope.opendate = function ($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened2 = !$scope.opened2;
    };

  }]);


