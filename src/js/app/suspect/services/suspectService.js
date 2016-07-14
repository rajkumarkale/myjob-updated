angular.module('com.module.suspect').factory('suspectService', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;

  var getSuspects = function (currentPage,numPerPage) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/suspect?page='+currentPage+'&count='+numPerPage
    });
  };
  var getSuspectsByRange = function (currentPage,numPerPage,start,end) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/suspect?page='+currentPage+'&count='+numPerPage+'&start='+start+'&end='+end
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
    var transfer = function (cid,uid) {
    return $http({
        method: 'GET',
        url: BASEURI + '/api/client/transfer/'+cid+'/'+uid
    });
};
    var share = function (data,cid) {
    return $http({
        method: 'POST',
        url: BASEURI + '/api/client/share/'+cid,
        data: data
    });
};

  return {
    getSuspects:getSuspects,
    getSuspectById:getSuspectById,
      getNames:getNames,
      suspectUpdate:suspectUpdate,
      getSuspectsByRange:getSuspectsByRange,
      transfer:transfer,
      share:share
  }
});
