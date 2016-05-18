angular.module('com.module.user').controller('appController', ['$scope','$state','AuthService', 'user','$rootScope','$modal',
  function ($scope,$state,AuthService, user,$rootScope,$modal) {
  'use strict';
  /*$rootScope.user = user.data;*/
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
