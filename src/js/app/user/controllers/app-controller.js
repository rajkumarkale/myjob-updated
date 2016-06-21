angular.module('com.module.user').controller('appController', ['$scope','$state','AuthService','$rootScope','$modal', 'user','$cookieStore',
  function ($scope,$state,AuthService,$rootScope,$modal, user,$cookieStore) {
  'use strict';
  $rootScope.user = user.data;
  $rootScope.isAdmin =  false;
  $rootScope.backgroundImageDisplay = false;
  $scope.backgroundImageDisplay = false;
  $scope.logout = function (){
    AuthService.logout().success(function (data){
      $cookieStore.remove('userData');
      $state.go('access.signin');
    }, function (error) {
      console.log(error);
    });
  };
  $scope.changePassword = function(){
    var modalInstance = $modal.open({
      templateUrl: 'js/app/user/views/change-password.html',
      backdrop: 'static',
      controller: 'changePasswordModalInstanceCtrl',
      size: 'md'
    });
    modalInstance.result.then(function () {
    });
  };
    $scope.updateProfile = function(){
      var modalInstance = $modal.open({
        templateUrl: 'js/app/user/views/update-profile.html',
        backdrop: 'static',
        controller: function($scope, $modalInstance){
          $scope.ok = function ()
          {
            $modalInstance.close();
          };
          $scope.cancel = function ()
          {
            $modalInstance.dismiss();
          };
        },
        size: 'md'
      });
      modalInstance.result.then(function () {
      });
    };
  }]);
