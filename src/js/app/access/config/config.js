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
          if ($cookies.user) {
            var token = JSON.parse($cookies.user).token;
            token ? config.headers.Authorization = token : null;
          }
          else if(config.url != 'js/app/access/views/app.html'){
            //$location.path('access.signin');
          }
          return config;
        }
      }
    }]);
