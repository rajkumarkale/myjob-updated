angular.module('com.module.admin').controller('adminUsersController', ['$scope','allUsers', function ($scope,allUsers) {
  'use strict';
  $scope.allUsers = allUsers.data;
}]);
