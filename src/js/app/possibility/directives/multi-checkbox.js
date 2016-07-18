
angular.module('com.module.possibility')
  .directive('multiCheckbox', function(toaster,CoreService) {
    return {
        scope:{
          title:"@",
            options:"=",
            value:"="
        },
        templateUrl:"js/app/possibility/views/multi-checkbox.html",
      link: function(scope, element, attr, ngModelCtrl) {
            scope.onChecked=function(){
                if(scope.options[0].value && scope.options[1].value){
                    scope.value="BOTH"
                }
                else if(scope.options[0].value){
                    scope.value=scope.options[0].key
                }else if(scope.options[1].value){
                    scope.value=scope.options[1].key
                }     
            }
    }
  };
});
