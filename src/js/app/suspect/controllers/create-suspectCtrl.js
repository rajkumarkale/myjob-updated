/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
  .controller('createSuspectCtrl',['$scope','appConfig','$modal','$stateParams','suspectService',function($scope,appConfig,$modal,$stateParams,suspectService){
    $scope.opening = true;
    $scope.init = function () {
      $scope.groupTurnover = appConfig.possibility.groupTurnover;
      $scope.businessVertical = appConfig.possibility.businessVertical;
      $scope.customerType = appConfig.possibility.customerType;
      $scope.contactType = appConfig.possibility.contactType;
      $scope.point_of_contacts =[{name:"",designation:"",phone:"",support_location:"",contact_type:"",isOpen:true}];

    };
    $scope.init();

    $scope.title = "Client Details";
    $scope.myPromise = suspectService.getSuspectById($stateParams.suspect.client_unit_id).then(function(response) {
      console.log(response.data);
      $scope.createPossibility=response.data;
$scope.suspect={};
      $scope.suspect=response.data.point_of_contacts[0];
      $scope.createPossibility.employee_size= $scope.getSlectedItem($scope.createPossibility.employee_size, $scope.employeeSize).displayText;
      $scope.createPossibility.turnover = $scope.getSlectedItem($scope.createPossibility.turnover, $scope.groupTurnover).displayText;
      $scope.createPossibility.vertical = $scope.getSlectedItem($scope.createPossibility.vertical, $scope.businessVertical).displayText;
      $scope.createPossibility.customer_type = $scope.getSlectedItem($scope.createPossibility.customer_type, $scope.customerType).displayText;
      console.log($scope.status.selectedItem+'selected tedt');
    });
    $scope.disableForm = function() {
      if (!$scope.isEditable && !$scope.isNewPossibility ) {
        var className = 'app-container-blur';
        return className;
      }

    };

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
