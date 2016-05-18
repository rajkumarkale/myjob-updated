/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.prospect').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.viewProspect', {
      url: '/view-prospect',
      templateUrl: 'js/app/prospect/views/view-prospect.html'
    })
    .state('app.viewDiscussions', {
      url: '/view-discussions',
      templateUrl: 'js/app/prospect/views/view-discussions.html'
    })

}]);
