angular.module('com.module.prospect')
.controller('prospectCreateController',['$scope','$state','appConfig',function($scope,$state,appConfig){
  $scope.values=appConfig.prospect.typeOfBusiness;
  $scope.status_prospect=appConfig.prospect.status_prospect;
  $scope.status=appConfig.suspect.status;
  $scope.displayagreement=false;
  $scope.Requirement=false;
  $scope.requirement = function (close) {
    $scope.titlereq='Add New Requirement';
    if(close==='close')
    {
    $scope.Requirement=false;
    }
    else {
    $scope.Requirement=true;
    }
  };
  $scope.$watch('status_prospect.selectedItem',function(n,o){
    if(n.key==='Agreement_On_Closure'){
      $scope.title='Agreement on Closure';
      $scope.displayagreement=true;
    }else{
      $scope.displayagreement=false;
    }
  }) ;
  }]);
