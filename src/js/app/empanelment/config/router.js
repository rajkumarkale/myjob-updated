/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.empanelment')
  .config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.viewempanelment', {
      url: '/view-empanelment',
      controller:'empanelmentController',
      templateUrl: 'js/app/empanelment/views/view-empanelment.html'
    })
    .state('app.viewSLATracker', {
      url: '/view-SLA-Tracker',

      templateUrl: 'js/app/empanelment/views/view-SLA-Tracker.html'
    })
}]);
