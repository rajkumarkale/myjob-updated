/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.empanelment')

  .controller('viewEmpanelmentCtrl',['$scope','discussionService','$state','saleModuleService',function($scope,discussionService,$state,saleModuleService){
      $scope.data={};
    $scope.empanelmentCsvdata =[];
    $scope.getArray =function(){
      return $scope.empanelmentCsvdata;
    };

    $scope.getCSVHeader = function () {
      var headerArr = ["LegalEntity","BusinessUnit","Commercial Model","Agreement Start Date","Agreement Tenure","Business Vertical"];
      return headerArr;
    };
      $scope.openDiscussions = function(possibility){
                discussionService.setData(possibility);
				$state.go('app.viewDiscussions');
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

      saleModuleService.getDashboardData().then(function (response) {
            var data = response.data;
          console.log(data.empanelment.count);
            $scope.data.count = data.empanelment.count ? data.empanelment.count : 0;

        });
    }]);
