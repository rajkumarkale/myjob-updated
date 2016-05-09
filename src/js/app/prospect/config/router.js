/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.prospect').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.prospect', {
      url: '/prospect',
      controller:'prospectController',
      templateUrl: 'js/app/prospect/views/prospect.html'
    })
}]);
