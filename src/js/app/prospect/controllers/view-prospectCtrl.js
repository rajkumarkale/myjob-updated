/**
 * Created by rkale on 5/20/2016.
 */
angular.module('com.module.prospect')

.controller('viewProspectCtrl',['$scope','prospectService','CoreService','$modal','discussionService','$state',function($scope,prospectService,CoreService,$modal,discussionService,$state){

          $scope.sortType     = 'legal_name';
        $scope.sortReverse  = false;
        $scope.searchView   = '';
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
  $scope.myPromise = prospectService.getProspects(1,10).then(function(response){
    console.log(response);
      /*CoreService.toastSuccess('','PROSPECTS Retrieved Successfully.');*/
    $scope.data.prospects = response.data.prospects;
    $scope.data.totalItems = response.data.count;
    $scope.data.LOST=response.data.LOST;
    $scope.data.WON=response.data.WON;
    $scope.data.PROGRESS=response.data.WORK_IN_PROGRESS;
    /*$scope.data.estimated_closure = response.data.estimated_closure;*/
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
    return  status.replace('_',' ');
  }


});

