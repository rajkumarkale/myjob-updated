'use strict';
angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'ui.bootstrap',
  'ui.utils',
  'angularFileUpload',
  'cgBusy',
  'ngAudio',
  'http-auth-interceptor',
  'pascalprecht.translate',
  'com.module.access',
  'com.module.core',
  'com.module.user',
  'com.module.admin',
  'ui.sortable'
]);

angular.element(document).ready(function () {
  jQuery.get('/client-config.json?'+new Date().getTime(), function (data) {
    angular.module('app').run(function ($rootScope) {
      $rootScope.app = data.app;
    }).constant('appConfig', data.app);
    angular.bootstrap(document, ['app']);
  });
});
