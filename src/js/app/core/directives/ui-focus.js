angular.module('app')
  .directive('uiFocus', function ($timeout, $parse) {
    'use strict';
    return {
      link: function (scope, element, attr) {
        var model = $parse(attr.uiFocus);
        scope.$watch(model, function (value) {
          if (value) {
            $timeout(function () {
              element[0].focus();
            });
          }
        });
        element.bind('blur', function () {
          scope.$apply(model.assign(scope, false));
        });
      }
    };
  });
