angular.module('com.module.user').factory('dashBoardService', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;
    var getDashboardCount = function (client_unit_id ,client_status_id ,disussed_by) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/dashboard?client_unit_id='+client_unit_id+'&client_status_id='+client_status_id+'&disussed_by='+disussed_by
    });
  };
    return {
        getDashboardCount:getDashboardCount
    }
});