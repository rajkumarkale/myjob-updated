angular.module('com.module.user').controller('appController', ['$scope','$state','AuthService','$rootScope','$modal', function ($scope,$state,AuthService,$rootScope,$modal) {
  'use strict';
  //$rootScope.user = user.data;
  //$rootScope.profile = profile.data;
  $rootScope.isAdmin =  false;
  $rootScope.backgroundImageDisplay = false;
  $scope.backgroundImageDisplay = false;
  $scope.logout = function (){
    AuthService.logout().success(function (data){
      $state.go('access.signin');
      $cookies.token = ''
    });
  };
  $scope.openSupportModel = function () {
    var modalInstance;
    modalInstance = $modal.open({
      templateUrl: 'js/app/user/views/support.html',
      controller:'supportController',
      size:'md'
    });
    modalInstance.result.then(function () {
    }, function () {
    });
  };
  /*function init(){
    if($rootScope.user.roles.length == 0){
      return false;
    }
    var adminRole = _.find($rootScope.user.roles,function (role){
      return role.name == 'admin';
    });
    $rootScope.isAdmin = (adminRole)?true:false;
  };
  init();*/

}]);
