/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.prospect').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.createProspect', {
      url: '/create-prospect',
      templateUrl: 'js/app/prospect/views/create-prospect.html',
      controller:'prospectCreateController'
    })

}]);
