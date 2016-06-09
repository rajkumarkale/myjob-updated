/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
  .controller('createSuspectCtrl',['$scope','$modal',function($scope,$modal){

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    }

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

    console.log('sample');

    $scope.createContact = function () {
      var modalInstance1 = $modal.open({
        templateUrl: 'js/app/suspect/views/add-contact.html',
        backdrop: 'static',
        controller: 'addContactCtrl',
        size: ''
      });
      modalInstance1.result.then(function () {
      });
    };
  }]);
