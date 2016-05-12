angular.module('com.module.possibility')
.controller('possibilityListController',['$scope','$state',function($scope,$state){

	$scope.openCreatePossibility = function(){
				$state.go('app.createPossibility');
		}
  }]);
