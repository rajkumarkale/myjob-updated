angular.module('com.module.prospect')
.controller('prospectCreateController',['$scope','$state','appConfig',function($scope,$state,appConfig){
  $scope.values=appConfig.prospect.typeOfBusiness;
  console.log("dis is response");

  }]);
