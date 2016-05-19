/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.empanelment')
  .config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.viewEmpanelment', {
      url: '/view-empanelment',
      controller:'empanelmentController',
      templateUrl: 'js/app/empanelment/views/view-empanelment.html'
    })
    .state('app.createEmpanelment', {
      url: '/create-empanelment',
      templateUrl: 'js/app/empanelment/views/create-empanelment.html'
    })
    .state('app.slaTracker', {
      url: '/SLA-Tracker',
      templateUrl: 'js/app/empanelment/views/sla-Tracker.html'
    })
}]);
