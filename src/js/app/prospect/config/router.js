/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.prospect').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.viewProspect', {
      url: '/view-prospect',
      templateUrl: 'js/app/prospect/views/view-prospect.html',
      controller:'viewProspectCtrl'
    })
    .state('app.create-prospect', {
      url: '/create-prospect',
      templateUrl: 'js/app/prospect/views/create-prospect.html',
      controller:'prospectCreateController',
      params: {
        prospect: null
    }
    })
    .state('app.viewDiscussions', {
      url: '/view-discussions/:status',
      templateUrl: 'js/app/prospect/views/view-discussions.html',
      controller:'viewDiscussionCtrl'
    })
  .state('app.Requirements', {
    url: '/view-Requirements',
    templateUrl: 'js/app/prospect/views/add-requirement.html',
    controller:'addRequirement'
  });

}]);
