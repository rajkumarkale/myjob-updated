angular.module('com.module.prospect')
.controller('viewDiscussionCtrl',['$scope','$state','toaster','$timeout','$cookies','$stateParams',function($scope,$state,toaster,$timeout,$cookies,$stateParams){
    if ($stateParams.possibility) {
        console.log($stateParams.possibility);
    }
}]);