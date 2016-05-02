/**
 * Created by Mahesh Guggilla on 20/4/15.
 */

angular.module('com.module.role').controller('roleController', function ($scope, rolesFactory, $modal, $filter, toaster) {
  'use strict';
  $scope.role = {
    name: ''
  };
  $scope.getRoles = function () {
    $scope.myPromise = rolesFactory.readRoles().success(function (response) {
      $scope.rolesList = response;
      $scope.search($scope.searchKey);
    }).error(function (error) {
      toaster.pop('danger', error);
    })
  };


  $scope.add = function () {
    $scope.myPromise = rolesFactory.createRole({role: $scope.role.name}).then(function (data) {
      $scope.role.name = "";
      $scope.rolesList.push(data.data.result);
      $scope.search($scope.searchKey);
    }, function (error) {
      toaster.pop('danger', error);
    });
  }


  $scope.edit = function (role) {
    $scope.role = role;
  };
  $scope.save = function () {
         alert('No save api.')
  };
  $scope.reset = function (){
    $scope.role = {
      name: ''
    };
  };

  $scope.searchKey = '';
  $scope.filteredroles = [];
  $scope.row = '';
  $scope.select = function (page) {
    var end, start;
    start = (page - 1) * $scope.numPerPage;
    end = start + $scope.numPerPage;
    return $scope.currentPageroles = $scope.filteredroles.slice(start, end);
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
    $scope.filteredroles = $filter('filter')($scope.rolesList, searchKey);
    return $scope.onFilterChange();
  };
  $scope.order = function (rowName) {
    if ($scope.row === rowName) {
      return;
    }
    $scope.row = rowName;
    $scope.filteredroles = $filter('orderBy')($scope.rolesList, rowName);
    return $scope.onOrderChange();
  };
  $scope.numPerPage = 10;
  $scope.currentPage = 1;
  $scope.currentPageroles = [];
  var init = function () {
    $scope.getRoles();
    return $scope.select($scope.currentPage);
  };
  return init();
});
