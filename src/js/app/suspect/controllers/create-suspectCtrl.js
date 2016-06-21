/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
  .controller('createSuspectCtrl',['$scope','appConfig','$modal','$stateParams','suspectService','$http','$state',function($scope,appConfig,$modal,$stateParams,suspectService,$http,$state){
      $scope.getCopy=function(obj){
          return angular.copy(obj);
      };
      
      $scope.getNames=function(val){
          return $http({
      method: 'GET',
      url: 'http://myjobs-node-server-dev.herokuapp.com' + '/api/users?name='+val
    }).then(function(response){
              
              return response.data.users;/*.map(function(item){
        return item.name;
      });*/
          })
          /*suspectService.getNames(val).then(function(response){
              return response.data.users.map(function(item){
        return item.name;
          });
          });*/
      };
      $scope.setdata=function($item, $model, $label,$event,$index){
          /*console.log("hello");*/
          /*console.log($item);*/
          /*var ph=$("#contact"+$index).find('input').eq(2);*/
          var x=$item.poc_details;
          if(x){
          $("#contact"+$index+' .is-empty').removeClass('is-empty');
              $scope.point_of_contacts[$index].name=x.name;
              $scope.point_of_contacts[$index].phone=x.phone;
              $scope.point_of_contacts[$index].email_id=x.email_id;
              $scope.point_of_contacts[$index].designation=x.designation;
              $scope.point_of_contacts[$index].contact_type.selectedItem = $scope.getSelectedItem(x.contact_type,$scope.contactType);
              $scope.point_of_contacts[$index].support_area.selectedItem = $scope.getSelectedItem(x.support_area,angular.copy(appConfig.suspect.supportArea));
             }
         /* return $http({
      method: 'GET',
      url: 'http://myjobs-node-server-dev.herokuapp.com' + '/api/users?name='+$item
    }).then(function(response){
              
              var x=response.data.users[0].poc_details;
              $scope.point_of_contacts[$index].name=x.name;
              $scope.point_of_contacts[$index].phone=x.phone;
              $scope.point_of_contacts[$index].email_id=x.email_id;
              $scope.point_of_contacts[$index].designation=x.designation;
              $scope.point_of_contacts[$index].contact_type.selectedItem = $scope.getSelectedItem(x.contact_type,$scope.contactType);
              $scope.point_of_contacts[$index].support_area.selectedItem = $scope.getSelectedItem(x.support_area,angular.copy(appConfig.suspect.supportArea));
              
              
      });*/
      };
    $scope.opening = true;
    $scope.init = function () {
        $scope.employeeSize=appConfig.possibility.employeeSize;
      $scope.groupTurnover = appConfig.possibility.groupTurnover;
      $scope.businessVertical = appConfig.possibility.businessVertical;
      $scope.customerType = appConfig.possibility.customerType;
      $scope.contactType = appConfig.possibility.contactType;
      $scope.supportArea =appConfig.suspect.supportArea;
      $scope.point_of_contacts =[{name:"",designation:"",phone:"",email_id:"",contact_type:$scope.getCopy(appConfig.suspect.contactType),isOpen:true,support_area:angular.copy(appConfig.suspect.supportArea)}];
       //$scope.support_array=[appConfig.suspect.supportArea];

    };
    $scope.init();
      $scope.createPossibility={};
    $scope.title = "Client Details";
    $scope.myPromise = suspectService.getSuspectById($stateParams.suspect.client_unit_id).then(function(response) {
      console.log(response.data);
      $scope.createPossibility=response.data;
$scope.suspect={};
      $scope.suspect=response.data.point_of_contacts[0];
      $scope.createPossibility.employee_size= $scope.getSelectedItem($scope.createPossibility.employee_size, $scope.employeeSize).displayText;
      $scope.createPossibility.turnover = $scope.getSelectedItem($scope.createPossibility.turnover, $scope.groupTurnover).displayText;
      $scope.createPossibility.vertical = $scope.getSelectedItem($scope.createPossibility.vertical, $scope.businessVertical).displayText;
      $scope.createPossibility.customer_type = $scope.getSelectedItem($scope.createPossibility.customer_type, $scope.customerType).displayText;
        /*$scope.createPossibility.POC =$scope.suspect;*/
        $scope.createPossibility.point_of_contacts.map(function (Obj) {
            var i=0;
            $("#contact"+i+' .is-empty').removeClass('is-empty');
            $scope.point_of_contacts[i].name=Obj.name;
            $scope.point_of_contacts[i].email_id=Obj.email_id;
            $scope.point_of_contacts[i].designation=Obj.designation;
            $scope.point_of_contacts[i].phone=Obj.phone;
            $scope.point_of_contacts[i].contact_type.selectedItem = $scope.getSelectedItem(Obj.contact_type,$scope.contactType);
            $scope.point_of_contacts[i].support_area.selectedItem = $scope.getSelectedItem(Obj.support_area,$scope.supportArea);
            if(i>0){
                $scope.createNewContactList();
            }
            i=i+1;    
        });
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
      $scope.showRollOut=false;
    $scope.$watch('status.selectedItem',function(n,o){
        if(n.key==='HOT'){
            $scope.showRollOut=true;
        }else{
            $scope.showRollOut=false;
        }
    }) ; 
    $scope.createNewContactList = function(){
      var obj = {name:"",designation:"",phone:"",email_id:"",contact_type:$scope.getCopy(appConfig.suspect.contactType),isOpen:true,support_area:angular.copy(appConfig.suspect.supportArea)};
      $scope.point_of_contacts.push(obj);
        //$scope.support_array.push($scope.getCopy(appConfig.suspect.supportArea));
    };
      
    $scope.cancel = function() {
      $state.go('app.suspect-view');
    };
    $scope.submit = function () {
    var procObj = {};
    var poc = [];
    $scope.point_of_contacts.map(function (pocObj) {
        var requestPocObject = {};
        requestPocObject._id = $scope.createPossibility.point_of_contacts[0]._id;
        requestPocObject.contact_type = pocObj.contact_type.selectedItem ? pocObj.contact_type.selectedItem.key : null;
        requestPocObject.user_id = $scope.createPossibility.point_of_contacts[0].user_id;
        requestPocObject.name = pocObj.name;
        requestPocObject.email_id = pocObj.email_id;
        requestPocObject.support_area= pocObj.support_area.selectedItem ? pocObj.support_area.selectedItem.key : null;
        requestPocObject.designation = pocObj.designation;
        requestPocObject.phone = pocObj.phone;
        poc.push(requestPocObject);
    });

    procObj.client_unit_id = $scope.createPossibility.client_id;
    procObj.status = {
        current_status_id: $scope.createPossibility.current_status._id,
        status: $scope.status.selectedItem.key
    };
    procObj.point_of_contacts = poc;
    //procObj.document = [];
    procObj.user_id = $scope.createPossibility.point_of_contacts[0].user_id;
    $scope.myPromise = suspectService.suspectUpdate(procObj).then(function (response) {
        $state.go('app.suspect-view');
    });
    console.log($scope.point_of_contacts);
    console.log($scope.support_array);
};
      $scope.getSelectedItem = function(selectedItem, srcObj) {
            var returnObj;
            angular.forEach(srcObj.data, function(obj) {
                if (obj.displayText === selectedItem || obj.key === selectedItem) {
                    returnObj = obj;
                }
            });
            return returnObj;

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
