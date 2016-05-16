/**
 * Config for the router
 */
angular.module('app')
  .run(
  ['$rootScope', '$state', '$stateParams','CoreService',
    function ($rootScope, $state, $stateParams,CoreService) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.common = CoreService;

    }
  ]
)
  .config(
  ['$stateProvider', '$urlRouterProvider', 'appConfig',
    function ($stateProvider, $urlRouterProvider, appConfig) {
      $urlRouterProvider
        .otherwise(appConfig.appRoot);
      $stateProvider
        .state('error', {
          abstract: true,
          url: '/error',
          template: '<div ui-view class="fade-in-right-big smooth"></div>',
          data: {
            title: 'error'
          }
        })
        .state('error.404', {
          url: '/404',
          templateUrl: 'js/app/core/views/404.html',
          data: {
            title: 'Page not found.'
          }
        }).state('error.config', {
          url: '/config',
          templateUrl: 'js/app/core/views/config.html',
          data: {
            title: 'Configuration'
          }
        })


    }
  ]
);
