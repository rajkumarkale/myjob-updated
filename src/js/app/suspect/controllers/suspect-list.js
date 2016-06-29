angular.module('com.module.suspect')
.controller('suspectListController',['$scope','$state','toaster','$timeout','suspectService','CoreService','$modal',function($scope,$state,toaster,$timeout,suspectService,CoreService,$modal){
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
    $scope.selectAll = function () {
	            for (var i = 0; i < $scope.filteredRows.length; i++) {
	                $scope.filteredRows[i].isChecked = $scope.selectAllItems;
	            }
	        };
    $scope.selectEntity = function () {
	            for (var i = 0; i < $scope.filteredRows.length; i++) {
	                if ($scope.filteredRows[i].isChecked) {
	                    $scope.selectAllItems = true;
	                    return;
	                }
	            }
	            $scope.selectAllItems = false;
	        };
      $scope.sortType     = 'legal_name';
        $scope.sortReverse  = false;
        $scope.searchView   = '';
		$scope.getSuspects = function(currentPage,numPerPage){
		$scope.myPromise = suspectService.getSuspects(currentPage,numPerPage).then(function(response){
				CoreService.toastSuccess('', 'SUSPECT Retrieved Successfully.');
            console.log(response.data);
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
};

  $scope.open = function($event,opened) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openCal=opened;
    if($scope.openCal==='opened1') {
      $scope.opened1 = true;
      $scope.opened2 = false;
    }
    else if($scope.openCal==='opened2'){
      $scope.opened2 = true;
      $scope.opened1 = false;
    }
  };
  $scope.openShare = function (tpl) {
    var tpl=tpl;
    var modalInstance = $modal.open({
      templateUrl: function () {

        return 'js/app/prospect/views/'+tpl+'.html'

      },
      backdrop: 'static',
      controller: 'suspectShareCtrl',
      size: 'md'
    });
    modalInstance.result.then(function () {
    });
  };
  }]);
