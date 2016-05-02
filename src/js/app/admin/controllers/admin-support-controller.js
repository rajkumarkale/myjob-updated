angular.module('com.module.admin').controller('adminSupportController', ['$scope','allSupports', function ($scope,allSupports) {
  'use strict';
  $scope.allSupports = allSupports.data;
}]);
