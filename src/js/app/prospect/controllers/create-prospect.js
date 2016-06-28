angular.module('com.module.prospect')
.controller('prospectCreateController',['$scope','$state','appConfig',function($scope,$state,appConfig){
  $scope.values=appConfig.prospect.typeOfBusiness;
  $scope.status=appConfig.prospect.status;
  $scope.displayagreement=false;
  $scope.$watch('status.selectedItem',function(n,o){
    if(n.key==='Agreement_On_Closure'){
      $scope.title='Agreement on Closure';
      $scope.displayagreement=true;
    }else{
      $scope.displayagreement=false;
    }
  }) ;
  }]);
