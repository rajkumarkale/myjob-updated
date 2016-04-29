/**
 * Created by ramya on 15/6/15.
 */
angular.module('com.module.userManagement').factory('userManagementFactory', function ($http, appConfig) {
  'use strict';
  var BASEURI = appConfig.apiUrl;
  var URI = 'http://private-c31c0c6-sampleapi60.apiary-mock.com/';

  var searchUsers = function (data) {
    return $http({
      method: 'POST',
      url: BASEURI + '/search/user/namelike',
      data: data,
      body:data
    });
  };
  var userProfile = function (data) {
    return $http({
      method: 'GET',
      url: BASEURI + '/profile/user/' + data + '/compact',
      data: data
    });
  };
  var readRoles = function () {
    return $http({
      method: 'GET',
      url: BASEURI + '/roles/list/0/1000'
    })
  };

  var attachRoles = function (data) {
    return $http({
      method: 'POST',
      url: BASEURI + '/roles/attach/user',
      data: data
    });
  };

  var detachRoles = function(data){
    return $http({
      method: 'POST',
      url: BASEURI + '/user/detach/roles',
      data: data
    });
  }
  return {
    searchUsers: searchUsers,
    userProfile:userProfile,
    readRoles:readRoles,
    attachRoles:attachRoles,
    detachRoles:detachRoles
  }


});







