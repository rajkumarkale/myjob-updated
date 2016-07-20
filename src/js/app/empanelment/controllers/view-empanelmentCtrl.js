/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.empanelment')
  .controller('viewEmpanelmentCtrl',['$scope','discussionService','$state','$rootScope',function($scope,discussionService,$state,$rootScope){
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
    $scope.last='aaaaaaa';
    console.log($scope.last+''+$rootScope);
    }]);
