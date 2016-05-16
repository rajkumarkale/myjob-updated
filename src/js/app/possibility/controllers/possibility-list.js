angular.module('com.module.possibility')
.controller('possibilityListController',['$scope','$state','possibilityService',function($scope,$state,possibilityService){

	$scope.openCreatePossibility = function(){
				$state.go('app.createPossibility');
		}
		possibilityService.getPossibilitiess().then(function(response){

			console.log(response);

		});

  }]);
