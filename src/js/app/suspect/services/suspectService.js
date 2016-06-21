angular.module('com.module.suspect').factory('suspectService', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;

  var getSuspects = function (currentPage,numPerPage) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/suspect/'+currentPage+'/'+numPerPage
    });
  };
  var getSuspectById = function (Id) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/suspect/'+Id
    });
  };
    var getNames = function (val) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/users?name='+val
    });
  };
    var suspectUpdate = function (data) {
    return $http({
        method: 'PUT',
        url: BASEURI + '/api/suspect/update',
        data: data
    });
};

  return {
    getSuspects:getSuspects,
    getSuspectById:getSuspectById,
      getNames:getNames,
      suspectUpdate:suspectUpdate
  }
});
