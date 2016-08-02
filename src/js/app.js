'use strict';
angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angularFileUpload',
  'ngFileUpload',
  'cgBusy',
  'com.module.access',
  'com.module.core',
  'com.module.user',
  'com.module.suspect',
  'com.module.empanelment',
  'com.module.prospect',
  'com.module.possibility',
  'com.module.admin',
  'toaster',
  'highcharts-ng',
  'ngMaterial',
  'ngCsv'

]).config(function (datepickerConfig) {
      datepickerConfig.showWeeks = false;
    }).run(function ($rootScope) {
    $rootScope.searchView='';
    $rootScope.showSearch=true;
});

angular.element(document).ready(function () {
  jQuery.get('/client-config.json?'+new Date().getTime(), function (data) {
    angular.module('app').run(function ($rootScope) {
      $rootScope.app = data.app;
    }).constant('appConfig', data.app);
    angular.bootstrap(document, ['app']);
  });
});
