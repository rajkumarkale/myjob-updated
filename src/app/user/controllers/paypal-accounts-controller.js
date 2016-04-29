/**
 * Created by revathi on 10/7/15.
 */
angular.module('com.module.user').controller('paypalController',['$scope', '$location', 'toaster', 'operationsFactory', '$cookies','appConfig', '$rootScope', '$state', function ($scope, $location, toaster, operationsFactory, $cookies) {
  'use strict';
  $scope.paypal = function (user) {
    $scope.myPromise = operationsFactory.paypalAccount({
      "user_id": $cookies.userId,
      "type":"EMAIL",
      "value":user.email
    }).then(function (response) {
      toaster.pop('success', 'Added Successfully');
      $scope.isCollapsed = true;
      $scope.authError = false;
      user.email = '';
    }, function (error) {
      $scope.authError = true;
      $scope.authError = error.data.err.message;
    });
  };

}]);
