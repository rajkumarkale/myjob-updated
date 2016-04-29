angular.module('com.module.userManagement').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.userManagement', {
      url: '/userManagement',
      template: '<div ui-view class="fade-in-up"></div>'
    })
    .state('app.userManagement.view', {
      url: '/view',
      templateUrl: 'js/app/userManagement/views/view.html',
      data :{
        title:'User Management'
      }
    })
    .state('app.userManagement.create', {
      url: '/create',
      templateUrl: 'js/app/userManagement/views/create.html',
      data :{
        title:'User Management Add'
      }
    })
}]);
