/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
  .controller('createSuspectCtrl',['$scope','$modal',function($scope,$modal){
    $scope.open = function($event,opened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope[opened] = true;
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
