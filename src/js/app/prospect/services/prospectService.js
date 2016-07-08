/**
 * Created by kveena on 6/21/2016.
 */
angular.module('com.module.prospect').factory('prospectService', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;

  var getProspects= function (currentPage,numPerPage) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/prospect?page='+currentPage+'&count='+numPerPage
    });
  };

  var getDiscussion=function(id){
    return $http({
      method:'GET',
      url:BASEURI + '/api/discussions?client_unit_id= '+ id
    });
  };

  return {
    getProspects:getProspects,
    getDiscussion:getDiscussion
  }
});
