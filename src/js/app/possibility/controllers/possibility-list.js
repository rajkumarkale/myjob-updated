angular.module('com.module.possibility')
.controller('possibilityListController',['$scope','$state','possibilityService',function($scope,$state,possibilityService){
		possibilityService.getPossibilitiess().then(function(response){
			console.log(response);
		});

  }]);
