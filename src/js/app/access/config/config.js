angular.module('com.module.access')
  .config([  '$httpProvider', function ( $httpProvider) {
    'use strict';
    $httpProvider.defaults.headers.common['source'] = 'web';
    $httpProvider.interceptors.push('AuthRequestInterceptor');
    $httpProvider.defaults.headers.post.J290EeGRFyIYRdXES7outLUbZKr = 'l0FQ5cmpRcADmREyUY4DKwH3CnxejQtpb1cM';
  }])
  .factory('AuthRequestInterceptor', ['$q', '$cookies',
    function ($q, $cookies) {
      return {
        'request': function (config) {
          if ($cookies.userInfo) {
            var token = JSON.parse($cookies.userInfo).token;
            token ? config.headers.Authorization = 'token=' + token : null;
          }
          else {
          }
          return config;
        }
      }
    }]);
