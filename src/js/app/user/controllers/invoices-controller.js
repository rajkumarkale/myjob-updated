angular.module('com.module.user')
.controller('invoicesController',['$scope','invoices',function($scope,invoices){

    $scope.invoices = invoices.data;

  }]);
