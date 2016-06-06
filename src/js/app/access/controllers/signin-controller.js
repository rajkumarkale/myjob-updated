angular.module('com.module.access').controller('SignInFormController',['$scope', '$location', 'toaster',  'AuthService', 'appConfig','authService','$state', '$stateParams', '$modal', '$cookies',
  function ($scope, $location, toaster,  AuthService, appConfig,authService,$state, $stateParams, $modal,$cookies) {
  'use strict';
  $scope.logIn = function (user) {
    $scope.myPromise = AuthService.login({
      password: user.password,
      email_id : user.email_id
    }).then(function (response) {
      if(response.data.message){
        $scope.authStatus = true;
        $scope.authError = response.data.message;
        return ;
      }
      //authService.loginConfirmed(response);
      /*if ($scope.$prevState && $scope.$prevStateParams) {
        if(_.contains(['access.signin','access.signup','access.forgotpwd','access.signout'],$scope.$prevState)){
          $state.go($scope.app.loginRedirect);
        }else {
          $state.go($scope.$prevState,$scope.$prevStateParams);
        }
      } else {
        $state.go($scope.app.loginRedirect);
      }*/
      $state.go($scope.app.loginRedirect);

    }, function (error) {
      $scope.authStatus = true;
      $scope.authError = error.data.message;
    });
  };
  $scope.openModel = function(){
    var modalInstance = $modal.open({
      templateUrl: 'js/app/access/views/forgot-password.html',
      backdrop: 'static',
      controller: function($scope,$modalInstance,AuthService){
        $scope.forgotPassword = function (data) {
          $scope.myPromise =  AuthService.forgotPassword({
            'email': data
          }).then(function (response) {
            toaster.pop(response, 'Reset Successful');
            $scope.isCollapsed = false;
            $scope.authError = false;
          }, function (error) {
            $scope.authError = true;
            $scope.authError = error.error;
          });
        };
        $scope.cancel = function(){
          $modalInstance.dismiss('cancel');
        };
      },
      size: 'sm'
    });
    modalInstance.result.then(function () {
    });
  };

  $scope.changePassword = function (user) {
    AuthService.changePassword({
      'email_id': user.email,
      'old_password': user.oldPassword,
      'new_password': user.newPassword,
      'user_id': $cookieStore.get('userId')
    }).then(function (response) {
      toaster.pop(response, 'Changed Successfully');
      $scope.isCollapsed = true;
      $scope.authError = false;
      $location.path(appConfig.loginRedirect);
    }, function (error) {
      $scope.authError = true;
      $scope.authError = error.data.error;
    });

  };
  $scope.logout = function () {
    AuthService.logout().then(function (response) {

    }, function (error) {
    });
  };

/*
    $scope.resetPassword = function(user){

      $scope.myPromise =  AuthService.reset({
        password: user.password,
        confirmPassword: user.confirmPassword,
        token:$stateParams.token
      }).then(function (response) {
        $scope.isCollapsed = true;
        $state.go('access.signin');
      }, function (error) {
        console.log(error);
        $scope.resetError = true;
        });
    };*/
}]);
