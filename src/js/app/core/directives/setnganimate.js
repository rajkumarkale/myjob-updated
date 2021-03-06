angular.module('app')
  .directive('setNgAnimate', ['$animate', function ($animate) {
    'use strict';
    return {
      link: function ($scope, $element, $attrs) {
        $scope.$watch(function () {
          return $scope.$eval($attrs.setNgAnimate, $scope);
        }, function (valnew) {
          $animate.enabled(!!valnew, $element);
        });
      }
    };
  }]);