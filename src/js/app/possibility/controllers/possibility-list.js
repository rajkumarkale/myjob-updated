angular.module('com.module.possibility')
.controller('possibilityListController',['$scope','$state','toaster','$timeout','possibilityCreateService',function($scope,$state,toaster,$timeout,possibilityCreateService){
	$scope.data = {
		    numPerPage: 1,
		    searchKeywords: '',
		    row: '',
		    currentPage: 1
		};

		$scope.getPossibilities = function(currentPage,numPerPage){
		$scope.myPromise = possibilityCreateService.getPossibility(currentPage,numPerPage).then(function(response){
			$timeout(function() {
				toaster.pop('success', 'POSSIBILITY Created Successfully.');
			}, 1000);
			$scope.data.possibilities = response.data.possibilities;
			$scope.data.totalItems = response.data.count;
			$scope.data.met=response.data.met;
			$scope.data.notMet=response.data.not_met;
			$scope.data.inactive=response.data.inactive;
		});
		};
		$scope.getPossibilities($scope.data.currentPage,$scope.data.numPerPage);
		$scope.openEditPossibility = function(possibility){
				$state.go('app.createPossibility',{possibility:possibility});
		};

  $scope.open = function($event,opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openCal=opened;

    if($scope.openCal==='opened1')
    {
      $scope.opened1 = true;
      $scope.opened2 = false;
    }
    else if($scope.openCal==='opened2')
    {
      $scope.opened2 = true;
      $scope.opened1 = false;
    }
  };

  }]);
