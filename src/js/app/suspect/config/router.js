/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.suspect').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.suspect-view', {
      url: '/suspect-view',
      templateUrl: 'js/app/suspect/views/suspect-view.html',
      controller:'suspectListController'
    })
    .state('app.create-suspect-view', {
      url: '/update-suspect',
      templateUrl: 'js/app/suspect/views/update-suspect.html',
      controller:'updateSuspectCtrl',
      params: {
        suspect: null
    }
    });
}]);
