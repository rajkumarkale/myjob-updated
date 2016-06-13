angular.module('com.module.suspect').factory('suspectService', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;
  
  var getSuspects = function (currentPage,numPerPage) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/suspect/'+currentPage+'/'+numPerPage
    });
  };

  return {
    getSuspects:getSuspects
  }
});