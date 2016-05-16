angular.module('com.module.possibility')
  .service('possibilityService', ['$http', '$q', function ($http, $q) {
    'use strict';
    this.getPossibilitiess = function () {
      return $http({
        method: 'GET',
        url: 'js/app/possibility/data/possibility-list.json'
      });
    };
    
    
  }]);
