angular.module('com.module.access')
  .service('AuthService',['$http', 'appConfig','$cookies', '$q', function ($http, appConfig,$cookies, $q) {
    'use strict';
    this.forgotPassword = function (data) {
      return $http({
        method: 'POST',
        url: appConfig.apiUrl + '/api/login/forgot',
        data:data
      });
    };
    this.login = function (data) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'http://172.16.1.103:8000/api/login',/*'http://172.16.1.103:8000/api/login'*/
        data: data
      }).success(function (data) {
        
       var user = {
         token: data.authHeader,
         userDetails:data.user
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
        url: appConfig.apiUrl + '/api/logout'
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
