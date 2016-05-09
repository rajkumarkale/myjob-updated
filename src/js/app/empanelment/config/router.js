/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.empanelment').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.empanelment', {
      url: '/empanelment',
      controller:'empanelmentController',
      templateUrl: 'js/app/empanelment/views/empanelment.html'
    })
}]);
