/**
 * Created by revathi bandi on 4/18/2016.
 */
'use strict';
angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'cgBusy',
    'ui.select',
    'infinite-scroll',
    'pascalprecht.translate',
    'com.module.access',
    'com.module.core',
    'com.module.user',
    'com.module.userManagement'
]);

angular.element(document).ready(function () {
    jQuery.get('/client-config.json?'+new Date().getTime(), function (data) {
        angular.module('app').run(function ($rootScope) {
            $rootScope.app = data.app;
        }).constant('appConfig', data.app);
        angular.bootstrap(document, ['app']);
    });
});
