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
  var createSale = function (data) {
    return $http({
      method: 'POST',
      url: BASEURI + '/api/sale',
      data:data
    });
  };
  var getPossibilityByRange = function (currentPage,numPerPage,start,end) {
       var deferred= $q.defer();
     $http({
      method: 'GET',
        params:{
            start:start,
            end:end
        },
      url: BASEURI + '/api/sale'
    });
  };
    var deletePossibilities = function (clientUnitIds) {
     return $http({
      method: 'POST',
      url: BASEURI + '/api/possibility/delete/all',
        data:clientUnitIds
    });
  };
  var getPossibility = function (currentPage,numPerPage,start,end) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/possibility?page='+currentPage+'&count='+numPerPage
    });
  };
var possibilityDetails = function (id) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/possibility/'+id
    });
  };
  var updatePossibility = function(data){
    return $http({
      method:'PUT',
      url:BASEURI+'/api/sale/'+data._id,
      data:data
    });
  };
  var deleteDocument = function (id) {
    return $http({
      method: 'DELETE',
      url: BASEURI + '/api/document/delete/'+id
    });
  };
    var getDiscussions = function (obj) {
    return $http({
      method: 'GET',
      url: BASEURI + '/api/discussions?client_unit_id='+obj.client_unit_id+'&client_status_id='+obj.client_status_id+'&count='+obj.count+'&page='+obj.page+'&discussed_by='+obj.discussed_by
    });
  };
    var createDiscussion = function (data,id) {
    return $http({
      method: 'POST',
      url: BASEURI + '/api/sale/'+id+'/discussions',
        data:data
    });
  };
  return {
    getLegalEntity:getLegalEntity,
    createSale:createSale,
    getPossibility:getPossibility,
    possibilityDetails:possibilityDetails,
    updatePossibility:updatePossibility,
    deleteDocument:deleteDocument,
    createClient:createClient,
     getDiscussions:getDiscussions,
      createDiscussion:createDiscussion,
      getPossibilityByRange:getPossibilityByRange,
      deletePossibilities:deletePossibilities
  };
});
