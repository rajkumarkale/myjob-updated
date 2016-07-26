/**
 * Created by revathi bandi on 5/11/2016.
 */
var app=angular.module('com.module.empanelment')
  .controller('empanelmentController',['$scope','$state','appConfig','$stateParams',function($scope,$state,appConfig,$stateParams){
      $scope.init = function($stateParams) {
            $scope.pricingMode = appConfig.empanelment.pricingMode;
            $scope.creditTerm = appConfig.empanelment.creditTerm;
            $scope.OB=appConfig.empanelment.OB;

      };
    $scope.init();
      if($stateParams.empanelment){
          $scope.saleObject=$stateParams.empanelment;
      }
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
//sla tracker
      $scope.submitSLA=function(){
          
      }
  }]);


