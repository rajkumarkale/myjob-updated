/**
 * Created by revathi bandi on 11/5/16.
 */
angular.module('com.module.user').directive('sameAs', [ function () {
  'use strict';
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var firstPassword = '#' + attrs.sameAs;
      elm.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          // console.info(elm.val() === $(firstPassword).val());
          ctrl.$setValidity('matchpassword', elm.val() === $(firstPassword).val());
        });
      });
      /*ctrl.$parsers.unshift(function(viewValue) {
        if (viewValue === attrs.sameAs) {
          ctrl.$setValidity('sameAs', true);
          return viewValue;
        } else {
          ctrl.$setValidity('sameAs', false);
          return undefined;
        }
      });*/
    }

  };
}]);
