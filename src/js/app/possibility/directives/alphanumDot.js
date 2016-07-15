/**
 * Created by rkale on 7/14/2016.
 */
angular.module('com.module.possibility')
  .directive('alphnumDot', function(CoreService) {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          var transformedInput = text.replace(/[^a-zA-Z0-9\. ]/g, '');
          if (transformedInput !== text) {
            /* CoreService.toastError('', 'Please enter Alphanumeric only');*/
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput; // or return Number(transformedInput)
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });

