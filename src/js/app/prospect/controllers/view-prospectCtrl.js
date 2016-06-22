/**
 * Created by rkale on 5/20/2016.
 */
angular.module('com.module.prospect')
.controller('viewProspectCtrl',['$scope','prospectService',function($scope,prospectService){
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
  $scope.myPromise = prospectService.getProspects(1,10).then(function(response){
    console.log(response);
    $scope.data.prospects = response.data.prospects;
    $scope.data.totalItems = response.data.count;
    $scope.data.LOST=response.data.LOST;
    $scope.data.WON=response.data.WON;
    $scope.data.WORK_IN_PROGRESS=response.data.WORK_IN_PROGRESS;
    /*$scope.data.estimated_closure = response.data.estimated_closure;*/
  });

}]);

