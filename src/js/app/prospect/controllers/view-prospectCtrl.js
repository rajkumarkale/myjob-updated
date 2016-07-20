/**
 * Created by rkale on 5/20/2016.
 */
angular.module('com.module.prospect')

.controller('viewProspectCtrl',['$scope','prospectService','CoreService','$modal','discussionService','$state','$rootScope','possibilityCreateServices',function($scope,prospectService,CoreService,$modal,discussionService,$state,$rootScope,possibilityCreateServices){

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
    $scope.myPromise = possibilityCreateServices.getSalesData({stage:'PROSPECT'}).then(function (response) {
                console.log("possible", response);
                $scope.data.prospects = response;
                $scope.data.totalItems = response.length;
                $scope.data.WON= possibilityCreateServices.getStatusCount(response, 'prospect', 'WON');
                $scope.data.LOST = possibilityCreateServices.getStatusCount(response, 'prospect', 'LOST');
                $scope.data.PROGRESS = possibilityCreateServices.getStatusCount(response, 'prospect', 'WORK_IN_PROGRESS');
            $scope.data.agreement_on_closure = possibilityCreateServices.getStatusCount(response, 'prospect', 'AGREEMENT_ON_CLOSURE');
            });
    $scope.openDiscussions = function(prospect){
                discussionService.setData(prospect);
				$state.go('app.viewDiscussions');
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

