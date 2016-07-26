/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.empanelment')
  .config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.viewEmpanelment', {
      url: '/view-empanelment',
      controller:'viewEmpanelmentCtrl',
      templateUrl: 'js/app/empanelment/views/view-empanelment.html'
    })
    .state('app.createEmpanelment', {
      url: '/create-empanelment',
      templateUrl: 'js/app/empanelment/views/create-empanelment.html',
      controller:'empanelmentController',
      params: {
        empanelment: null
    }
    })
    .state('app.slaTracker', {
      url: '/SLA-Tracker',
      templateUrl: 'js/app/empanelment/views/sla-Tracker.html',
      controller:'sla-step1-controller'
    })
    .state('app.slaTracker-step2', {
      url: '/SLA-Tracker-step2',
      templateUrl: 'js/app/empanelment/views/sla-Tracker-step2.html',
      controller:'sla-step1-controller'
    });
}]);
