/**
 * Created by rkale on 5/20/2016.
 */
angular.module('com.module.prospect')

.controller('viewProspectCtrl',['$scope','prospectService','CoreService','$modal','discussionService','$state','$rootScope','saleModuleService','$filter',function($scope,prospectService,CoreService,$modal,discussionService,$state,$rootScope,saleModuleService,$filter){

          $scope.sortType     = 'legal_name';
        $scope.sortReverse  = false;
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
  $scope.data = {
    numPerPage: 10,
    searchKeywords: '',
    row: '',
    currentPage: 1
  };
    $scope.selectedItem = [];
    $scope.filteredRows=[];
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

	        };
    $scope.statusColor=function(status){
    switch (status) {
    case "AGREEMENT_ON_CLOSURE":
        return 'status-AOC';
            break;
    case "WORK_IN_PROGRESS":
        return 'status-inactive';
            break;
    case "LOST":
        return 'status-notmet';
            break;
    case "WON":
        return 'status-met';
            break;
        default:
    }
};
    saleModuleService.getDashboardData().then(function (response) {
            console.log(response.data);
            var data = response.data;
            $scope.data.won = data.prospect.won ? data.prospect.won: 0;
            $scope.data.lost = data.prospect.lost? data.prospect.lost: 0;
            $scope.data.workInProgress = data.prospect.workInProgress ? data.prospect.workInProgress : 0;
            $scope.data.agreementOnClosure = data.prospect.agreementOnClosure ? data.prospect.agreementOnClosure : 0;
        });
    $scope.myPromise = saleModuleService.getSalesData({stage:'PROSPECT'}).then(function (response) {
                console.log("possible", response);
                $scope.data.prospects = response;
                $scope.data.totalItems = response.length;
            });
    $scope.openDiscussions = function(prospect,status){
                discussionService.setData(prospect);
				$state.go('app.viewDiscussions',{status:status});
		};
    $scope.getProspectsByRange = function (currentPage, numPerPage) {
            var st = $filter('date')($scope.start, 'MM/dd/yyyy');
            var date1 = Math.round(new Date(st).getTime() / 1000);
            var ed = $filter('date')($scope.end, 'MM/dd/yyyy');
            var date2 = Math.round(new Date(ed).getTime() / 1000);
            if (date1 < date2) {
                $scope.sumStartDate = $scope.start;
                $scope.sumEndDate = $filter('date')($scope.end, 'to MMMM yyyy');
                $scope.myPromise = saleModuleService.getSalesData({
                    stage: 'PROSPECT',
                    start: date1,
                    end: date2
                }).then(function (response) {
                    console.log(response.data);
                    $scope.data.prospects = response;
                $scope.data.totalItems = response.length;
                });
            } else {
                CoreService.toastError('', 'Satrt date should be less than end date.');
            }
        };
  $scope.openShare = function (tpl) {
    var tpl=tpl;
    var modalInstance = $modal.open({
      templateUrl: function () {

        return 'js/app/prospect/views/'+tpl+'.html'

      },
      backdrop: 'static',
      controller: 'shareCtrl',
      size: 'sm'
    });
    modalInstance.result.then(function () {
    });
  };
$scope.checkSelect={};

}])
  .filter('spaceless',function(){
  return function(status){
      if(status){
    return  status.replace('_',' ');
      }
  }


});

