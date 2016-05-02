angular.module('com.module.admin').controller('adminBooksController', ['$scope','allBooks', function ($scope,allBooks) {
  'use strict';
  $scope.allBooks = allBooks.data;
}]);
