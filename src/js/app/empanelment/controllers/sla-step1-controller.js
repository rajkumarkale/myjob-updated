/**
 * Created by kveena on 7/18/2016.
 */
angular.module('com.module.empanelment')
.controller('sla-step1-controller',['$scope','$state','appConfig','$rootScope',function($scope,$state,appConfig,$rootScope){

    $scope.OB = appConfig.empanelment.OB;

}]);
