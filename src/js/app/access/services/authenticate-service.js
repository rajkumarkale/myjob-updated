angular.module('com.module.access')
  .service('AuthService',['$http', 'appConfig', '$q', function ($http, appConfig, $q) {
    'use strict';
    this.forgotPassword = function (data) {
      return $http({
        method: 'GET',
        url: appConfig.apiUrl + '/user/password/reset/'+data.email
      });
    };
    this.login = function (data) {
      console.log(data)
     return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/api/login',
        data: data
      })
    };
    this.getUserInfo = function () {
      return $http.get('/users/me');
    };

    this.logout = function () {
      return $http({
        method: 'GET',
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
        method: 'POST',
        url: appConfig.apiUrl + '/update-password/'+data.userId,
        data: data
      });
    };
    this.getProfile = function (){
      return $http({
        method: 'GET',
        url: appConfig.apiUrl + '/me/profile'
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
