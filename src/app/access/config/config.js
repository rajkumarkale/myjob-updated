angular.module('com.module.access')
  .config(['FacebookProvider','$httpProvider', function (FacebookProvider, $httpProvider) {
    'use strict';
    //FacebookProvider.init('848964501826227');
    //$httpProvider.defaults.headers.common['source'] = 'web';
    //$httpProvider.interceptors.push('AuthRequestInterceptor');
    //$httpProvider.defaults.headers.post.J290EeGRFyIYRdXES7outLUbZKr = 'l0FQ5cmpRcADmREyUY4DKwH3CnxejQtpb1cM';
  }])
  /*.factory('AuthRequestInterceptor', ['$q', '$cookies',
    function ($q, $cookies) {
      return {
        'request': function (config) {
          if ($cookies.userInfo) {
            var token = angular.fromJson($cookies.userInfo).token;
            token ? config.headers.Authorization = 'token=' + token : null;
          }
          else {
          }
          return config;
        }
      }
    }]);*/


