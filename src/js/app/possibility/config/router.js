/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.possibility').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
   .state('app.viewPossibility', {
      url: '/view-possibility',
      templateUrl: 'js/app/possibility/views/view-possibility.html',
      controller:'possibilityListController'
    })
   .state('app.createPossibility', {
      url: '/create-possibility',
      templateUrl: 'js/app/possibility/views/create-possibility.html',
      controller:'createPossibilityController',
      params: {
        possibility: null
    }
    });
}]);
