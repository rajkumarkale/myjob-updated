/**
 * Created by revathi on 4/18/2016.
 */
angular.module('com.module.access').controller('SignInFormController',['$scope', '$location', '$window', '$timeout', 'toaster', 'Facebook', 'AuthService', '$cookieStore', '$cookies','appConfig', '$rootScope', '$state', 'userManagementFactory', function ($scope, $location, $window, $timeout, toaster, Facebook, AuthService, $cookieStore, $cookies, appConfig, $rootScope, $state, userManagementFactory) {
  'use strict';
  var getApi, access_token = '', statusChangeCallback, register, userInfo, googleRegister;
  if($cookies.userId){
    userManagementFactory.userProfile($cookies.userId).success(function (response) {
      $scope.presentUser = response.result;
      $rootScope.fb_id = response.result.fb_id;
      $rootScope.$broadcast('fb_id', $rootScope.fb_id);
    }).error(function (error) {

    });
  }
  $scope.logIn = function (user) {
    $scope.myPromise = AuthService.login({
      'provider': 'EMAIL',
      'platform': appConfig.platform,
      'uid': user.email,
      'password': user.password,
      'device_id': appConfig.device_id
    }).then(function (response) {
      $cookies.userId = response.accessToken;
      //$cookies.userName = response.userName;
      //$cookies.profilePic = response.profile_picture;
      $rootScope.role = response.role;
      $rootScope.profilePic= response.profile_picture;
      $rootScope.userName = response.userName;
      $rootScope.fb_id = response.fb_id;
      $rootScope.$broadcast('role', $rootScope.role);
      $rootScope.$broadcast('userName', $rootScope.userName);
      $rootScope.$broadcast('profilePic', $rootScope.profilePic);
      if($rootScope.previousePath && $rootScope.previousePath != "/access/sign-in"){
        $timeout(function(){
          $window.location.href = $location.$$absUrl.split('#')[0]+'#'+$rootScope.previousePath;
        },1000);
      }else {
        $state.go('app.operations.dashboard');
      }

      /*if($rootScope.role == 'admin'){
        if($rootScope.previousePath){
          $timeout(function(){
            $window.location.href = $location.$$absUrl.split('#')[0]+'#'+$rootScope.previousePath;
          },1000);
        }else {
          $state.go('app.operations.dashboard');
        }
      }
      else{
        if($rootScope.previousePath ){
          $timeout(function(){
            $window.location.href = $location.$$absUrl.split('#')[0]+'#'+$rootScope.previousePath;
          },1000);
        }else {
          $state.go('app.operations.dashboard');
        }
      }*/

    }, function (error) {
      $scope.authError = true;
      $scope.authError = error.error;
    });
  };

  $scope.forgotPassword = function (data) {
    $scope.myPromise = AuthService.forgotPassword({
      'email_id': data
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

    $scope.myPromise = AuthService.changePassword({
      'email_id': $scope.presentUser.email_id,
      'old_password': user.oldPassword,
      'new_password': user.newPassword,
      'user_id': $cookies.userId
    }).then(function (response) {
      toaster.pop(response, 'Changed Successfully');
      $scope.isCollapsed = true;
      $scope.authError = false;
      $state.go('app.operations.dashboard');
      /*if($rootScope.role == 'admin'){
        $state.go('app.operations.dashboard');
      }
      else{
        $state.go(appConfig.loginRedirect);
      }*/
    }, function (error) {
      $scope.authError = true;
      $scope.authError = error.data.error;
    });
  };

  $scope.emailVerification = function (data) {
    AuthService.getEmailVerification({
      'email_id': data
    }).then(function (response) {
      toaster.pop('success', 'Resent email,Please verify to login');
      $scope.successMsg = true;
    }, function (error) {
      toaster.pop('error', 'Error while sending email.');
      $scope.errorMessage= error.data.error;
      $scope.authError = true;
    });
  };
  statusChangeCallback = function (response) {
    access_token = response.authResponse.accessToken;
    //console.log(response);
    if (response.status === 'connected') {
      getApi(access_token);
    } else {
      toaster.pop('error', 'invalid username or password');
    }
  };
  $scope.fbLogin = function () {
    Facebook.login(function (response) {
      console.log(response);
      statusChangeCallback(response);
    }, {scope: 'user_birthday,user_location, user_likes, email,public_profile, user_about_me,user_hometown, user_photos, user_friends,user_education_history'});
  };
  getApi = function (accessToken) {
    Facebook.api('/me', function (response) {
      //console.log(response);
      //$cookies.userName = response.name;
      register(accessToken, response.id);
    });
  };
  register = function (accessToken, id) {
    $scope.myPromise = AuthService.register({
      'push_id': '646825052085536',
      'device_id': appConfig.device_id,
      'platform': appConfig.platform,
      'accounts': [{
        'provider': 'FACEBOOK',
        'uid': id,
        'access_token': accessToken
      }],
      'role': 'artist'
    }).success(function (data, status, headers, config) {
      $cookies.userId = data.user_id;
      angular.forEach(data.roles,function(roles){
        if(roles.name == 'admin'){
          $rootScope.role = roles.name;
        }
        else{
          $rootScope.role = roles.name;
        }
      });
      /*var role = data.roles[0].name;
      $cookies.role = role;
      $rootScope.role= role;*/
      userManagementFactory.userProfile($cookies.userId).success(function (response) {
        $scope.presentUser = response.result;
        $rootScope.userName = $scope.presentUser.name;
        $rootScope.profilePic = $scope.presentUser.profile_picture;
      }).error(function (error) {

      });
      $rootScope.profilePic= data.profilePic;
      //$rootScope.userName = $cookies.userName;
      $rootScope.$broadcast('role', $rootScope.role);
      $rootScope.$broadcast('userName', $rootScope.userName);
      $rootScope.$broadcast('profilePic', $rootScope.profilePic);
      $state.go('app.operations.myWorkModules');
      toaster.pop('success', 'Welcome');
    }, function (error) {
      $scope.authError = true;
      $scope.authError = error.error;
    });
  };

  /*googleRegister = function (accessToken, id) {
    $scope.myPromise = AuthService.register({
      'push_id': '646825052085536',
      'device_id': appConfig.device_id,
      'platform': appConfig.platform,
      'accounts': [{
        'provider': 'GPLUS',
        'uid': id,
        'access_token': accessToken
      }],
      'role': 'artist'

    }).success(function (data, status, headers, config) {

      $location.path('app/operations/dashboard');
      $cookieStore.put('userId', data.user_id);
      //$cookieStore.put('profilePic', data.profile_picture);
      var role = data.roles[0].name;
      $cookieStore.put('role',role);
      $rootScope.role= role;
      //$rootScope.profilePic= $cookieStore.get('profilePic');
      $rootScope.userName = data.userName;
      $rootScope.$broadcast('role', $rootScope.role);
      $rootScope.$broadcast('userName', $rootScope.userName);
      //$rootScope.$broadcast('profilePic', $rootScope.profilePic);
      //$state.go('app.operations.myWorkModules');
      toaster.pop('success', 'Welcome');
    });
  };

  $scope.$on('event:google-plus-signin-success', function (event, authResult) {



    gapi.client.request({path:'https://www.googleapis.com/plus/v1/people/me', method:'GET', callback: function(result) {
      googleRegister(authResult.access_token, result.id);
    }})


    // User successfully authorized the G+ App!
    //console.log('Signed in!');
  });
  $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
    // User has not authorized the G+ App!
    //console.log('Not signed into Google Plus.');
  });*/

  /////////////////google

  /*$scope.$on('event:google-plus-signin-success', function (event,authResult) {
    console.log(authResult);
console.log($rootScope.uid);

    // Send login to server or save intoFACEBOOK cookie
    $scope.myPromise = AuthService.register({
      'push_id': '646825052085536',
      'device_id': appConfig.device_id,
      'platform': appConfig.platform,
      'accounts': [{
        'provider': 'GPLUS',
        'uid': '111763353038804795508',
        'access_token': authResult.access_token
      }],
      'role': 'artist'
    }).success(function (response) {
      $cookieStore.put('userId', response.user_id);
      //$cookieStore.put('profilePic', response.profile_picture);
      var role = response.roles[0].name;
      $cookieStore.put('role',role);
      $rootScope.role= role;
      //$rootScope.profilePic= $cookieStore.get('profilePic');
      $rootScope.userName = response.userName;
      $rootScope.$broadcast('role', $rootScope.role);
      $rootScope.$broadcast('userName', $rootScope.userName);
      //$rootScope.$broadcast('profilePic', $rootScope.profilePic);
      toaster.pop('success', 'Welcome');
     $state.go('app.operations.dashboard');

    });
  });


  $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
    // Auth failure or signout detected
  });*/
}]);



