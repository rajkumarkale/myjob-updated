angular.module('com.module.possibility').factory('possibilityCreateService', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;
  var createClient = function (data) {
    return $http({
      method: 'POST',
      url: BASEURI + '/api/client/create',
      data: data
    });
  };
  var getLegalEntity = function (data) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/clients?legal_name='+data
    });
  };
  var setPossibility = function (data) {
    return $http({
      method: 'POST',
      url: BASEURI + '/api/possibility/create',
      data:data
    });
  };

  return {
    createClient: createClient,
    getLegalEntity:getLegalEntity,
    setPossibility:setPossibility
  }
});