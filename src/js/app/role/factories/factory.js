/**
 * Created by Mahesh Guggilla on 20/4/15.
 */
angular.module('com.module.role').factory('rolesFactory', function ($http, appConfig) {
    'use strict';
    var BASEURI = appConfig.apiUrl;
    var createRole = function (data) {
        return $http({
            method: 'POST',
            url: BASEURI + '/roles/add',
            data: data
        });
    };

    var readRoles = function () {
        return $http({
            method: 'GET',
            url: BASEURI + '/roles/list/0/1000'
        })
    };

    var updateRole = function (data) {
        return $http({
            method: 'POST',
            url: BASEURI + '/role/update',
            data: data
        });
    };


    return {
        createRole: createRole,
        readRoles: readRoles,
        updateRole: updateRole
    }
});
