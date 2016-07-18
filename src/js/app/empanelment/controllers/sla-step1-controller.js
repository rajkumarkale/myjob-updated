/**
 * Created by kveena on 7/18/2016.
 */
angular.module('com.module.empanelment')
.controller('sla-step1-controller',['$scope','$state','appConfig',function($scope,$state,appConfig){

    $scope.OB = appConfig.empanelment.OB;
   /* $scope.name="Neer Info Solutions Pvt Ltd ";*/

}]);
