angular.module('com.module.user').directive('changePassword',[function (){
    return {
      restrict:'E',
      controller:'changePasswordController',
      templateUrl:'js/app/user/views/change-password.html'
    };
}]);
