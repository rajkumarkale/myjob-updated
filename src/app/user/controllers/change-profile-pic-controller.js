/**
 * Created by revathi on 14/7/15.
 */
angular.module('com.module.user').controller('changeProfilePicController',['$scope', '$location', 'toaster', 'operationsFactory', 'userManagementFactory', '$cookieStore','appConfig', '$rootScope', '$state', '$q', '$cookies', function ($scope, $location, toaster, operationsFactory, userManagementFactory, $cookieStore,appConfig, $rootScope, $state, $q, $cookies) {
  'use strict';
  $scope.profilePicture = {};
  var fd;
  $scope.onBGSelect = function ($files) {
    var file = $files[0];
    if (!file) {
      return;
    }
    if ((/\.(jpg|jpeg|png)$/i).test(file.name)) {
      fd = new FormData();
      fd.append('content', file);
      var reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          $scope.$apply(function () {
            $scope.profilePicture.content = e.target.result;
          });
        };
      })(file);
      reader.readAsDataURL(file);
    }
    else {
      toaster.pop('error', "File Extension", "Not allowed.");
      $('input[name="bgimage"]').val("");
    }
  };
  $scope.changeProfilePicture = function () {
      if ($scope.profilePicture.content) {
        var track = [];
        for (var keys in $scope.profilePicture) {
          fd.append(keys, $scope.profilePicture[keys]);
        }
        track.push(operationsFactory.changeProfilePicture(fd));
        $scope.myPromise = $q.all(track).then(function (result) {
          toaster.pop('success', 'Changed Successfully');
          userManagementFactory.userProfile($cookies.userId).success(function (response) {
            $scope.presentUser = response.result;
            $rootScope.profilePic = $scope.presentUser.profile_picture;
          }).error(function (error) {
          });
          /*$cookieStore.remove('profilePic');
          $rootScope.profilePic = result.profile_picture;
          $cookieStore.put('profilePic',$rootScope.profilePic);
          $rootScope.$broadcast('profilePic', $rootScope.profilePic);*/
        });

      }
  };

}]);
