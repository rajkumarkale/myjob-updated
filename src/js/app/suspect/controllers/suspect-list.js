angular.module('com.module.suspect')
.controller('suspectListController',['$scope','$state','toaster','$timeout','suspectService',function($scope,$state,toaster,$timeout,suspectService){
    $scope.selectedItem = [];
    $scope.filteredRows=[];
	$scope.data = {
		    numPerPage: 10,
		    searchKeywords: '',
		    row: '',
		    currentPage: 1
		};
    $scope.setSelectedClient = function (item) {
        /*var id = this.company.id;*/
        if (_.contains($scope.selectedItem, item)) {
            $scope.selectedItem = _.without($scope.selectedItem, item);
        } else {
            $scope.selectedItem.push(item);
        }
        return false;
    };

    $scope.isChecked = function (item) {
        if (_.contains($scope.selectedItem, item)) {
            return 'glyphicon glyphicon-ok pull-right';
        }
        return false;
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
$scope.statusColor=function(status){
    switch (status) {
    case "COLD":
        return 'status-cold';
            break;
    case "WARM":
        return 'status-warm';
            break;
    case "HOT":
        return 'status-hot';
            break;
        default:
    }
}

  $scope.open = function($event,opened) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope[opened] = true;
  };

  }]);
