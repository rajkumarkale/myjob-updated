/**
 * Created by rkale on 7/13/2016.
 */
angular.module('com.module.possibility')
  .directive('alphabetsOnly', function(toaster,CoreService) {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          var transformedInput = text.replace(/[^a-zA-Z ]/g, '');
          if (transformedInput !== text) {
            /*CoreService.toastError('', 'Please enter Alphabets only');*/
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput; // or return Number(transformedInput)
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
