/**
 * Created by rkale on 5/20/2016.
 */
angular.module('com.module.prospect')
.controller('viewProspectCtrl',['$scope','$modal','prospectService',function($scope,$modal,prospectService){

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
    $scope.statusColor=function(status){
    switch (status) {
    case "AGREEMENT_ON_CLOSURE":
        return 'status-AOC';
            break;
    case "WORK_IN_PROGRESS":
        return 'status-WIP';
            break;
    case "LOST":
        return 'status-lost';
            break;
    case "WON":
        return 'status-won';
            break;
        default:
    }
};
  $scope.myPromise = prospectService.getProspects(1,10).then(function(response){
    console.log(response);
    $scope.data.prospects = response.data.prospects;
    $scope.data.totalItems = response.data.count;
    $scope.data.LOST=response.data.LOST;
    $scope.data.WON=response.data.WON;
    $scope.data.PROGRESS=response.data.WORK_IN_PROGRESS;
    /*$scope.data.estimated_closure = response.data.estimated_closure;*/
  });
  $scope.openShare = function (tpl) {
    var tpl=tpl;
    var modalInstance = $modal.open({
      templateUrl: function () {

        return 'js/app/prospect/views/'+tpl+'.html'

      },
      backdrop: 'static',
      controller: 'shareCtrl',
      size: 'md'
    });
    modalInstance.result.then(function () {
    });
  };

}])
  .filter('spaceless',function(){
  return function(status){
    return  status.replace('_',' ');
  }


});

