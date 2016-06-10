/*Created by Mahesh Guggilla on 20/4/15.*/
angular.module('com.module.right').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.right', {
      url: '/right',
      template: '<div ui-view class="fade-in-up"></div>',
      data :{
        title:'rights'
      }
    })
    .state('app.right.view', {
      url: '/view',
      templateUrl: 'js/app/right/views/list.html',
      data :{
        title:'rights List'
      }
    });
}]);
