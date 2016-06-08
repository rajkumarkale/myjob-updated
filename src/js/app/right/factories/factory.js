/**
 * Created by Mahesh Guggilla on 20/4/15.
 */
angular.module('com.module.right').factory('rightsFactory', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;
  var createRight = function (data) {
    return $http({
      method: 'POST',
      url: BASEURI + '/rights/add',
      data: data
    });
  };

  var readRights = function () {
    return $http({
      method: 'GET',
      url: BASEURI + '/rights/list/0/1000'
    });
  };

  var updateRight = function (data) {
    return $http({
      method: 'POST',
      url: BASEURI + '/rights/update',
      data: data
    });
  };


  return {
    createRight: createRight,
    readRights: readRights,
    updateRole: updateRight
  };
});
