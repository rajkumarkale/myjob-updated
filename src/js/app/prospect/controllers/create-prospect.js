angular.module('com.module.prospect')
.controller('prospectCreateController',['$scope','$state',function($scope,$state){

	$scope.openViewProspect = function(){
				$state.go('app.createProspect');
		}
  }]);
