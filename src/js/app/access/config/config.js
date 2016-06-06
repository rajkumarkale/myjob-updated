angular.module('com.module.access')
  .config([  '$httpProvider', function ( $httpProvider) {
    'use strict';
    $httpProvider.defaults.headers.common['source'] = 'web';
    $httpProvider.interceptors.push('AuthRequestInterceptor');
    }])
  .factory('AuthRequestInterceptor', ['$q', '$cookies', '$location',
    function ($q, $cookies, $location) {
      return {
        'request': function (config) {
          if ($cookies.userData) {
            var token = JSON.parse($cookies.userData).token;
            token ? config.headers.Authorization = token : null;
          }
          return config;
        }
      }
    }]);
