/**
 * Created by revathi bandi on 5/11/2016.
 */
angular.module('com.module.empanelment')
  .controller('empanelmentController',['$scope','$state',function($scope,$state){

    $scope.openViewempanelment = function(){
      $state.go('app.viewempanelment');
    }
  }]);
