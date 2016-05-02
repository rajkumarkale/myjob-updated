angular.module('app')
  .directive('uiScroll', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
    'use strict';
    return {
      restrict: 'AC',
      link: function (scope, el, attr) {
        el.on('click', function (e) {
          $location.hash(attr.uiScroll);
          $anchorScroll();
        });
      }
    };
  }]);