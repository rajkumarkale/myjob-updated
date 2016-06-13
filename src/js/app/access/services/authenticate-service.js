angular.module('com.module.access')
  .service('AuthService',['$http', 'appConfig','$cookies', '$q', function ($http, appConfig,$cookies, $q) {
    'use strict';
    var deferred = $q.defer();
    this.forgotPassword = function (data) {
      return $http({
        method: 'GET',
        url: appConfig.apiUrl + '/user/password/reset/'+data.email
      });
    };
    this.login = function (data) {
     return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/api/login',
        data: data
      }).success(function (data) {
        var now = new Date();
        now.setDate(now.getDate()+1);
       var user = {
         token: data.authHeader,
         userDetails:data.user,
         expires:now
       };
       $cookies.userData = JSON.stringify(user);
       deferred.resolve(user);
     }).error(function (error) {
       deferred.reject(error);
     });
      return deferred.promise;
    };
    this.getUserInfo = function () {
      return $http.get(appConfig.apiUrl +'/api/users/my/profile');
    };

    this.logout = function () {
      return $http({
        method: 'DELETE',
        url: appConfig.apiUrl + '/logout'
      });
    };
    this.signUp = function (data) {
      return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/register',
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
        method: 'PUT',
        url: appConfig.apiUrl + '/api/users/my/password/change',
        data: data
      });
    };
    this.getProfile = function (){
      return $http({
        method: 'GET',
        url: appConfig.apiUrl + '/api/my/profile'
      });
    };

    this.updateProfile = function (data){
      return $http({
        method: 'PUT',
        url: appConfig.apiUrl + '/profiles/'+data.id,
        data:data
      });
    };
    this.reset = function (data){
      return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/user/password/reset/'+ data.token,
        data: data
      });
    };
  }]);
