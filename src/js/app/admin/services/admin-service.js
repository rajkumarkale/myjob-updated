angular.module('com.module.admin')
  .service('adminService', ['$http', 'appConfig', '$q', function ($http, appConfig, $q) {
    'use strict';
    this.getBooks = function () {
      return $http({
        method: 'GET',
        url: appConfig.apiUrl + '/books'
      });
    };
    this.getUsers = function () {
      return $http({
        method: 'GET',
        url: appConfig.apiUrl + '/users'
      });
    };
    this.getSupports = function () {
      return $http({
        method: 'GET',
        url: appConfig.apiUrl + '/supports'
      });
    };
  }]);
