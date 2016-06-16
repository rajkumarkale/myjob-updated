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
      url: BASEURI + '/api/clients?legal_name=' + data
    });
  };
  var setPossibility = function (data) {
    return $http({
      method: 'POST',
      url: BASEURI + '/api/possibility/create',
      data: data
    });
  };
  var getPossibility = function (currentPage, numPerPage) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/possibility/' + currentPage + '/' + numPerPage
    });
  };
  var possibilityDetails = function (id) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/possibility/' + id
    });
  };
  var updatePossibility = function (data) {
    return $http({
      method: 'PUT',
      url: BASEURI + '/api/possibility/update',
      data: data
    })
  }
  var deleteDocument = function (id) {
    return $http({
      method: 'DELETE',
      url: BASEURI + '/api/document/delete/'+id
    })
  }
  return {
    getLegalEntity: getLegalEntity,
    setPossibility: setPossibility,
    getPossibility: getPossibility,
    possibilityDetails: possibilityDetails,
    updatePossibility: updatePossibility
  }
});
