angular.module('com.module.possibility').factory('possibilityService', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;
  var createClient = function (data) {
    return $http({
      method: 'POST',
      url: BASEURI + '/rights/add',
      data: data
    });
  };

  


  return {
    createClient: createClient
    
  }
});