angular.module('com.module.admin')
  .service('possibilityService', ['$http',  '$q', function ($http, $q) {
    'use strict';
    this.getPossibilitiess = function () {
      return $http({
        method: 'GET',
        url: ''
      });
    };
    
    
  }]);
