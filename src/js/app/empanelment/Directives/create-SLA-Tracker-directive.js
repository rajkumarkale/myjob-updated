/**
 * Created by kveena on 5/24/2016.
 */

app.directive('inputPrice', function () {
  return {
    restrict: 'A',

    link: function (scope,element,attribute,controller) {
      scope.$watch('inputValue', function(newValue,oldValue) {
        if(String(newValue).indexOf(',') != -1)
          scope.inputValue = String(newValue).replace(',', '.');
        else {
          var index_dot,
            arr = String(newValue).split("");
          if (arr.length === 0) return;
          if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.')) return;
          if (arr.length === 2 && newValue === '-.') return;
          if (isNaN(newValue) || ((index_dot = String(newValue).indexOf('.')) != -1 && String(newValue).length - index_dot > 3 )) {
            scope.inputValue = oldValue;
          }
        }
      });
    }
  };
});
