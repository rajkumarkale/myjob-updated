angular.module('com.module.access').controller('SignInFormController',['$scope', '$location', 'toaster',  'AuthService', 'appConfig','authService','$state', '$stateParams', function ($scope, $location, toaster,  AuthService, appConfig,authService,$state, $stateParams) {

  'use strict';
  var getApi, access_token = '', statusChangeCallback, register;
  $scope.logIn = function (user) {
    $scope.myPromise = AuthService.login({
      'identifier': user.email,
      'password': user.password
    }).then(function (response) {
      if(response.data.message){
        $scope.authStatus = true;
        $scope.authError = response.data.message;
        return ;
      }
      authService.loginConfirmed(response);
      if ($scope.$prevState && $scope.$prevStateParams) {
        if(_.contains(['access.signin','access.signup','access.forgotpwd','access.signout'],$scope.$prevState)){
          $state.go($scope.app.loginRedirect);
        }else {
          $state.go($scope.$prevState,$scope.$prevStateParams);
        }
      } else {
        $state.go($scope.app.loginRedirect);
      }

    }, function (error) {
      $scope.authStatus = true;
      $scope.authError = error.data.message;
    });
  };

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


  register = function (accessToken, id) {
    /*AuthService.register({
      'push_id': 'APA91bHqeZdXXFCtkGh',
      'device_id': appConfig.device_id,
      'platform': appConfig.platform,
      'accounts': [{
        'provider': 'FACEBOOK',
        'uid': id,
        'access_token': accessToken
      }]
    }).success(function (response) {
      $location.path(appConfig.appRoot);
      toaster.pop(response, 'Welcome');
    });*/
  };

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
    };
}]);
