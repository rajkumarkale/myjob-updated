angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate',  '$window', '$state', '$rootScope','$templateCache','$interpolate',
    function ($scope, $translate,  $window, $state, $rootScope,$templateCache,$interpolate) {
      'use strict';
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

      var startSym = $interpolate.startSymbol();
      var endSym = $interpolate.endSymbol();
      // config
      $scope.$watch('app.settings', function () {
        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
      }, true);

      $rootScope.$on('$stateChangeStart',  function (event, toState, toParams, fromState, fromParams) {
        $rootScope.$prevState = toState.name;
        $rootScope.$prevStateParams = toParams;
          if(toState.name==='app.dashboard'|| toState.name==='app.viewDiscussions'){
              $rootScope.showSearch=false;
          }else{
              $rootScope.showSearch=true;
          }
      });

      $scope.$on('$stateChangeSuccess', function (event, toState,toParams,from,fromParams) {
        if (toState.data && toState.data.title) {
          $scope.app.title = toState.data.title;
        } else {
          $scope.app.title = $scope.app.name;
        }

      });
      $scope.lang = {isopen: false};
      $scope.langs = {en: 'English', de_DE: 'German', it_IT: 'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function (langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      $scope.$on('event:auth-loginRequired', function (rejection) {

        $state.go('access.signin');
      });
      $templateCache.put('/dialogs/confirm.html','<div class="modal-header dialog-header-confirm"><button type="button" class="close" ng-click="no()">&times;</button><h4 class="modal-title"><span class="'+startSym+'icon'+endSym+'"></span> '+startSym+'header'+endSym+'</h4></div><div class="modal-body" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="yes()">'+startSym+'"Yes" | translate'+endSym+'</button><button type="button" class="btn btn-primary" ng-click="no()">'+startSym+'"No" | translate'+endSym+'</button></div>');

      function isSmartDevice($window) {
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

    }]);
