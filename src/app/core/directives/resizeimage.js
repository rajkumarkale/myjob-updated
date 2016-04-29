angular.module('app').directive('resizable', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      elementStyle: '='
    },
    link: function (scope, element) {

      element.on('click', function () {
        element.addClass('ele-active');
        element.append('<div class="handler"></div>');
        element.draggable({
          handle: '.handler',
          containment: '.canvasdiv',
          revert: false,
          stop: function (event, ui) {
            scope.$apply(function () {
              scope.elementStyle.x = ui.position.left;
              scope.elementStyle.y = ui.position.top;
            });
          }
        }).resizable({
          stop: function (event, ui) {
            scope.$apply(function () {
              scope.elementStyle.width = ui.size.width;
              scope.elementStyle.height = ui.size.height;
            });
          },
          aspectRatio: true
        });
      });

      scope.$on('$destroy', function () {
        element.removeClass('active');
      });
    }
  };
});
