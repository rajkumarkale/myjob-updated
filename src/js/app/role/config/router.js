/*Created by Mahesh Guggilla on 20/4/15.*/
angular.module('com.module.role').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.role', {
      url: '/role',
      template: '<div ui-view class="fade-in-up"></div>',
      data :{
        title:'roles'
      }
    })
    .state('app.role.view', {
      url: '/view',
      templateUrl: 'js/app/role/views/list.html',
      data :{
        title:'roles'
      }
    });
}]);