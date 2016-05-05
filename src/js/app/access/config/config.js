angular.module('com.module.access')
  .config([  '$httpProvider', function ( $httpProvider) {
    'use strict';
    $httpProvider.defaults.headers.common['source'] = 'web';
    $httpProvider.interceptors.push('AuthRequestInterceptor');
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
