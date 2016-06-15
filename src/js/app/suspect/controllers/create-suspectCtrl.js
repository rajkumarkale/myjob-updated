/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
  .controller('createSuspectCtrl',['$scope','appConfig','$modal','$stateParams','suspectService',function($scope,appConfig,$modal,$stateParams,suspectService){
    $scope.opening = true;
    $scope.init = function () {
      $scope.point_of_contacts =[{name:"",designation:"",phone:"",support_location:"",contact_type:"",isOpen:true}];
    };
    $scope.init();
    /*$scope.myPromise = suspectService.getSuspectById($stateParams.suspect.client_unit_id).then(function(response) {
      console.log(response.data);
    });*/
    $scope.contactType = appConfig.suspect.contactType;
    $scope.supportArea = appConfig.suspect.supportArea;
    $scope.status = appConfig.suspect.status;
    $scope.createNewContactList = function(){
      var obj = {name:"",designation:"",phone:"",support_location:"",contact_type:appConfig.possibility.contactType,isOpen:true};
      $scope.point_of_contacts.push(obj);
    };

    $scope.cancel = function() {
      $state.go('app.suspect-view');
    };
    /*$scope.open = function($event,opened) {
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
    };*/
    /*$scope.createContact = function () {
      var modalInstance1 = $modal.open({
        templateUrl: 'js/app/suspect/views/add-contact.html',
        backdrop: 'static',
        controller: 'addContactCtrl',
        size: ''
      });
      modalInstance1.result.then(function () {
      });
    };*/
  }]);
