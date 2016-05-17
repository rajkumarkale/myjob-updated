/**
 * Created by revathi bandi on 5/9/2016.
 */
angular.module('com.module.prospect').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.viewProspect', {
      url: '/create-prospect',
      templateUrl: 'js/app/prospect/views/view-prospect.html',
      controller:'prospectCreateController'
    })

}]);
