angular.module('com.module.suspect')
.controller('suspectListController',['$scope','$state','toaster','$timeout','suspectService',function($scope,$state,toaster,$timeout,suspectService){
	$scope.data = {
		    numPerPage: 10,
		    searchKeywords: '',
		    row: '',
		    currentPage: 1
		};
      $scope.sortType     = 'legal_name';
        $scope.sortReverse  = false;
        $scope.searchView   = '';
		$scope.getSuspects = function(currentPage,numPerPage){
		$scope.myPromise = suspectService.getSuspects(currentPage,numPerPage).then(function(response){
			$timeout(function() {
				toaster.pop('success', 'POSSIBILITY Created Successfully.');
			}, 1000);
			$scope.data.suspects = response.data.suspects;
			$scope.data.totalItems = response.data.count;
			$scope.data.COLD=response.data.COLD;
			$scope.data.HOT=response.data.HOT;
			$scope.data.WARM=response.data.WARM;
		});
		};
		$scope.getSuspects($scope.data.currentPage,$scope.data.numPerPage);
		$scope.openEditSuspect = function(suspect){
			$state.go('app.create-suspect-view',{suspect:suspect});

		};


  $scope.open = function($event,opened) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope[opened] = true;
  };

  }]);
