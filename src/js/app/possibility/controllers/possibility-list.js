angular.module('com.module.possibility')
.controller('possibilityListController',['$scope','$state','possibilityCreateService',function($scope,$state,possibilityCreateService){
	$scope.data = {
		    numPerPage: 1,
		    searchKeywords: '',
		    row: '',
		    currentPage: 1
		};

		$scope.getPossibilities = function(currentPage,numPerPage){
		$scope.myPromise = possibilityCreateService.getPossibility(currentPage,numPerPage).then(function(response){
			$scope.data.possibilities = response.data.possibilities;
			$scope.data.totalItems = response.data.count;
		});
		}
		$scope.getPossibilities($scope.data.currentPage,$scope.data.numPerPage);
		$scope.openEditPossibility = function(possibility){
				$state.go('app.createPossibility',{possibility:possibility});
		}

  }]);
