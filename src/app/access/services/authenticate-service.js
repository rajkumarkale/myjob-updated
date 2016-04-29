/**
 * Created by revathi on 4/18/2016.
 */
angular.module('com.module.access')
  .service('AuthService',['$http', 'appConfig', '$q', '$cookies', '$rootScope', function ($http, appConfig, $q, $cookies, $rootScope) {
    'use strict';
    var userInfo;
    this.register = function (data) {
      var deferred = $q.defer();
      return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/profile/user',
        data: data
      }).success(function (data, status, headers, config) {
        userInfo = {
          accessToken: data.user_id,
          userName: data.name,
          token: headers('Token')
        };
        $cookies.userInfo = JSON.stringify(userInfo);
        deferred.resolve(userInfo);
      }).error(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.forgotPassword = function (data) {
      return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/user/action/password/reset',
        data: data
      });
    };
    this.login = function (data) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: appConfig.apiUrl + '/user/action/signin',
        data: data
      }).success(function (data, status, headers, config) {
        angular.forEach(data.roles,function(roles){
          if(roles.name == 'admin'){
            $rootScope.role = roles.name;
          }
          else{
            $rootScope.role = roles.name;
          }
        });
        userInfo = {
          accessToken: data.user_id,
          userName: data.name,
          token: headers('Token'),
          profile_picture : data.profile_picture,
          role : $rootScope.role
        };
        //var role = data.roles[0].name;
        //$cookies.role = role;
        $cookies.userInfo = JSON.stringify(userInfo);
        deferred.resolve(userInfo);
      }).error(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
    this.getUserInfo = function () {
      return userInfo;
    };
    this.init = function () {
      if ($cookies.userInfo) {
        userInfo = angular.fromJson($cookies.userInfo);
      }
    };
    this.init();
    this.logout = function () {
      return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/profile/logout'
      });
    };
    this.signUp = function (data) {
      return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/profile/user',
        data: data
      });
    };
    this.getEmailVerification = function (data) {
      return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/user/email/verification/resend',
        data: data
      });
    };
    this.changePassword = function (data) {
      return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/user/action/password/change',
        data: data
      });
    };
  }]);
