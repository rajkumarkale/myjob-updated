angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$cookieStore', '$cookies', 'CoreService', '$rootScope', '$modal','toaster', '$interval',
    function ($scope, $translate, $localStorage, $window, $cookieStore, $cookies, CoreService, $rootScope,$modal,toaster, $interval) {
      'use strict';
      // add 'ie' classes to html
      /*if($cookies.userName  && $cookies.userName != 'undefined' && $cookies.userName != 'null'){
        $rootScope.userName = $cookies.userName;
      }
      else{
        $rootScope.userName = 'USER';
      }
      //AuthService.getUserInfo()
      if($cookies.userInfo){
        userManagementFactory.userProfile( angular.fromJson($cookies.userInfo).accessToken).success(function (response) {
          $scope.presentUser = response.result;
          angular.forEach(response.result.roles,function(roles){
            if(roles.name == 'admin'){
              $rootScope.role = roles.name;
            }
            else{
              $rootScope.role = roles.name;
            }
          });
          $rootScope.userName = response.result.name;
          $rootScope.profilePic = $scope.presentUser.profile_picture;
        })
      }
      if($cookies.userInfo){
        $rootScope.$on("role", function (event, role) {
          $rootScope.role = role;
        });
        $rootScope.$on("profilePic", function (event, profilePic) {
          $rootScope.profilePic = profilePic;
        });
        $scope.$on("userName", function (event, userName) {
          $rootScope.userName = userName;

        });
      }*/

      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
      // config

      if (angular.isDefined($localStorage.settings)) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function () {

        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
          // aside dock and fixed must set the header fixed.

          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      $scope.$on('$stateChangeSuccess', function (event, toState) {
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
      function isSmartDevice($window) {
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

    }]);
