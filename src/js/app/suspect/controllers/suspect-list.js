angular.module('com.module.suspect')
.controller('suspectListController',['$scope','$state','toaster','$timeout','suspectService','CoreService','$modal','discussionService','$filter','$rootScope',function($scope,$state,toaster,$timeout,suspectService,CoreService,$modal,discussionService,$filter,$rootScope){
    $scope.selectedItem = [];
    $scope.filteredRows=[];
    $scope.sortType     = 'legal_name';
    $scope.sortReverse  = false;
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
    /*$scope.selectAll = function () {
	            for (var i = 0; i < $scope.filteredRows.length; i++) {
	                $scope.filteredRows[i].isChecked = $scope.selectAllItems;
	            }
        $scope.select();
	        };
    $scope.selectEntity = function () {
        $scope.select();
	            for (var i = 0; i < $scope.filteredRows.length; i++) {
	                if (!$scope.filteredRows[i].isChecked) {
	                    $scope.selectAllItems = false;
	                    return;
	                }
	            }
	            $scope.selectAllItems = true;
	        };
    $scope.select= function () {
	            for (var i = 0; i < $scope.filteredRows.length; i++) {
	                if ($scope.filteredRows[i].isChecked) {
                        $scope.isShow= true;
	                    return;dateOptions
	                }
                    $scope.isShow= false;
	            }

	        };*/
      $scope.sortType     = 'legal_name';
        $scope.sortReverse  = false;
        $scope.searchView   = '';
		$scope.getSuspects = function(currentPage,numPerPage){
		$scope.myPromise = suspectService.getSuspects(currentPage,numPerPage).then(function(response){
				/*CoreService.toastSuccess('', 'SUSPECT Retrieved Successfully.');*/
            console.log(response.data);
			$scope.data.suspects = response.data.suspects;
			$scope.data.totalItems = response.data.count;
			$scope.data.COLD=response.data.cold;
			$scope.data.HOT=response.data.hot;
			$scope.data.WARM=response.data.warm;
		});
		};
    $scope.sumStartDate=new Date();
    $scope.sumEndDate;
    $scope.getSuspectsByRange=function(currentPage,numPerPage){
        var st=$filter('date')($scope.start, 'MM/dd/yyyy');
        var date1=Math.round(new Date(st).getTime()/1000);
        var ed=$filter('date')($scope.end, 'MM/dd/yyyy');
        var date2=Math.round(new Date(ed).getTime()/1000);
        if(date1<date2){
            $scope.sumStartDate=$scope.start;
            $scope.sumEndDate=$filter('date')($scope.end, 'to MMMM yyyy');
          $scope.myPromise = suspectService.getSuspectsByRange(currentPage,numPerPage,date1,date2).then(function(response){
            console.log(response.data);
            $scope.data.suspects = response.data.suspects;
			$scope.data.totalItems = response.data.count;
			$scope.data.COLD=response.data.COLD;
			$scope.data.HOT=response.data.HOT;
			$scope.data.WARM=response.data.WARM;
		});
            }else{
            CoreService.toastError('', 'Satrt date should be less than end date.');
            }
    };
		$scope.getSuspects($scope.data.currentPage,$scope.data.numPerPage);
		$scope.openEditSuspect = function(suspect){
			$state.go('app.create-suspect-view',{suspect:suspect});

		};
    $scope.openDiscussions = function(suspect){
                discussionService.setData(suspect);
				$state.go('app.viewDiscussions');
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

        return 'js/app/suspect/views/'+tpl+'.html'

      },
      backdrop: 'static',
      controller: 'suspectShareCtrl',
      size: 'sm'
    });
    modalInstance.result.then(function () {
    });
  };
  }]);
