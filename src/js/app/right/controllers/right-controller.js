/**
 * Created by Mahesh Guggilla on 20/4/15.
 */

/*
angular.module('com.module.right').controller('rightController', function ($scope, rightsFactory, $modal, $filter, toaster) {
  'use strict';
  $scope.right = {
    name: ''
  };
  $scope.getRights = function () {
    $scope.myPromise = rightsFactory.readRights().success(function (response) {
      $scope.rightsList = response;
      $scope.search($scope.searchKey);
    }).error(function (error) {
      toaster.pop('danger', error);
    });
  };


  $scope.add = function () {
    $scope.myPromise = rightsFactory.createRight({right: $scope.right.name}).then(function (data) {
      $scope.right.name = "";
      $scope.rightsList.push(data.data.result);
      $scope.search($scope.searchKey);
    }, function (error) {
      toaster.pop('danger', error);
    });
  };


  $scope.edit = function (right) {
    $scope.right = right;
  };
  $scope.save = function () {
         alert('No save api.');
  };
  $scope.reset = function (){
    $scope.right = {
      name: ''
    };
  };

  $scope.searchKey = '';
  $scope.filteredrights = [];
  $scope.row = '';
  $scope.select = function (page) {
    var end, start;
    start = (page - 1) * $scope.numPerPage;
    end = start + $scope.numPerPage;
    return $scope.currentPagerights = $scope.filteredrights.slice(start, end);
  };
  $scope.onFilterChange = function () {
    $scope.select(1);
    $scope.currentPage = 1;
    return $scope.row = '';
  };
  $scope.onNumPerPageChange = function () {
    $scope.select(1);
    return $scope.currentPage = 1;
  };
  $scope.onOrderChange = function () {
    $scope.select(1);
    return $scope.currentPage = 1;
  };
  $scope.search = function (searchKey) {
    $scope.filteredrights = $filter('filter')($scope.rightsList, searchKey);
    return $scope.onFilterChange();
  };
  $scope.order = function (rowName) {
    if ($scope.row === rowName) {
      return;
    }
    $scope.row = rowName;
    $scope.filteredrights = $filter('orderBy')($scope.rightsList, rowName);
    return $scope.onOrderChange();
  };
  $scope.numPerPage = 10;
  $scope.currentPage = 1;
  $scope.currentPagerights = [];
  var init = function () {
    $scope.getRights();
    return $scope.select($scope.currentPage);
  };
  return init();
});
*/
