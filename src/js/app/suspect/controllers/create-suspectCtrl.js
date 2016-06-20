/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
  .controller('createSuspectCtrl',['$scope','appConfig','$modal','$stateParams','suspectService','$http',function($scope,appConfig,$modal,$stateParams,suspectService,$http){
      $scope.getCopy=function(obj){
          return angular.copy(obj);
      };
      
      $scope.getNames=function(val){
          return $http({
      method: 'GET',
      url: 'http://myjobs-node-server-dev.herokuapp.com' + '/api/users?name='+val
    }).then(function(response){
              
              return response.data.users.map(function(item){
        return item.name;
      });
          })
          /*suspectService.getNames(val).then(function(response){
              return response.data.users.map(function(item){
        return item.name;
          });
          });*/
      };
      $scope.setdata=function($item, $model, $label,$event,$index){
          console.log($index);
          /*var ph=$("#contact"+$index).find('input').eq(2);*/
          $("#contact"+$index+' .is-empty').removeClass('is-empty');
          return $http({
      method: 'GET',
      url: 'http://myjobs-node-server-dev.herokuapp.com' + '/api/users?name='+$item
    }).then(function(response){
              
              var x=response.data.users[0].poc_details;
              $scope.point_of_contacts[$index].phone=x.phone;
              $scope.point_of_contacts[$index].designation=x.designation;
              var temp=$scope.point_of_contacts[$index]['contact_type']['data'].filter(function(obj){
                   if(obj.key==x.contact_type){
                       return true;
                   }
              });
              $scope.point_of_contacts[$index].contact_type.selectedItem=temp[0];
              $scope.point_of_contacts[$index].email_id=x.email_id;
              var temp1=$scope.support_array[$index]["data"].filter(function(obj){
                   if(obj.key==x.support_area){
                       return true;
                   }
              });
              $scope.support_array[$index].selectedItem=temp1[0];
              /*ph.val(x.phone);*/
              console.log($scope.point_of_contacts[$index]);
                console.log($scope.support_array[$index]);
      });
      };
    $scope.opening = true;
    $scope.init = function () {

      $scope.groupTurnover = appConfig.possibility.groupTurnover;
      $scope.businessVertical = appConfig.possibility.businessVertical;
      $scope.customerType = appConfig.possibility.customerType;
      $scope.contactType = appConfig.possibility.contactType;
      /*$scope.point_of_contacts =[{name:"",designation:"",phone:"",support_location:"",contact_type:"",isOpen:true}];*/
      $scope.point_of_contacts =[{name:"",designation:"",phone:"",email_id:"",contact_type:$scope.getCopy(appConfig.suspect.contactType),isOpen:true}];
        $scope.support_array=[appConfig.suspect.supportArea];

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
      var obj = {name:"",designation:"",phone:"",support_location:"",contact_type:$scope.getCopy(appConfig.suspect.contactType),isOpen:true};
      $scope.point_of_contacts.push(obj);
        $scope.support_array.push($scope.getCopy(appConfig.suspect.supportArea));
    };
      
    $scope.cancel = function() {
      $state.go('app.suspect-view');
    };
      $scope.submit=function(){
          console.log($scope.point_of_contacts);
                console.log($scope.support_array);
      }

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
