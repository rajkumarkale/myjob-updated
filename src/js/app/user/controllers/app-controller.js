angular.module('com.module.user').controller('appController', ['$scope','$state','AuthService','$rootScope','$modal', 'user',
  function ($scope,$state,AuthService,$rootScope,$modal, user) {
  'use strict';
  $rootScope.user = user.data;
  $rootScope.isAdmin =  false;
  $rootScope.backgroundImageDisplay = false;
  $scope.backgroundImageDisplay = false;
  $scope.logout = function (){
    AuthService.logout().success(function (data){
      $state.go('access.signin');
      $cookies.token = '';
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
  }]);
