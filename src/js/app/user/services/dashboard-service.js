angular.module('com.module.user').factory('dashBoardService', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;
    var getDashboardCount = function (userId) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/dashboard/'+userId+'/count'
    });
  };
    return {
        getDashboardCount:getDashboardCount
    }
});