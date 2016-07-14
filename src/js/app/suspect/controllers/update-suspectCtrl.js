/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
    .controller('updateSuspectCtrl', ['$scope', 'appConfig', '$modal', '$stateParams', 'suspectService', '$http', '$state', 'Upload', '$q','CoreService','$cookies', function ($scope, appConfig, $modal, $stateParams, suspectService, $http, $state, Upload, $q,CoreService,$cookies) {
       $scope.met_status='MET';
        $scope.status = {
            open: true
        };
        $scope.getCopy = function (obj) {
            return angular.copy(obj);
        };

        $scope.getNames = function (val) {
            return $http({
                    method: 'GET',
                    url: 'http://myjobs-node-server-dev.herokuapp.com'+'/api/users?name='+val
                }).then(function (response) {
                    return response.data.users;
                });
                /*suspectService.getNames(val).then(function(response){
              return response.data.users;
          });*/
        };


        $scope.setdata = function ($item, $model, $label, $event, $index) {

            var x = $item.poc_details;
            if (x) {
                $("#contact" + $index + ' .is-empty').removeClass('is-empty');
                $scope.point_of_contacts[$index]._id=x._id;
                $scope.point_of_contacts[$index].user_id=x.user_id;
                $scope.point_of_contacts[$index].name = x.name;
                $scope.point_of_contacts[$index].phone = x.phone;
                $scope.point_of_contacts[$index].email_id = x.email_id;
                $scope.point_of_contacts[$index].designation = x.designation;
                $scope.point_of_contacts[$index].contact_type.selectedItem = $scope.getSelectedItem(x.contact_type, $scope.contactType);
                $scope.point_of_contacts[$index].support_area.selectedItem = $scope.getSelectedItem(x.support_area, angular.copy(appConfig.suspect.supportArea));
                $scope.point_of_contacts[$index].support_location=x.support_location;
                if(x.support_type==='LOCAL') {
          $scope.point_of_contacts[$index].local=true;
        }
        else if(x.support_type==='REMOTE'){
          $scope.point_of_contacts[$index].remote=true;
        }
        else if(x.support_type==='BOTH'){
          $scope.point_of_contacts[$index].local = true;
          $scope.point_of_contacts[$index].remote=true;
        }
                //$scope.point_of_contacts[$index].support_type=x.support_type;
            }

        };
        $scope.opening = true;
        $scope.init = function () {
            $scope.employeeSize = appConfig.possibility.employeeSize;
            $scope.groupTurnover = appConfig.possibility.groupTurnover;
            $scope.businessVertical = appConfig.possibility.businessVertical;
            $scope.customerType = appConfig.possibility.customerType;
            $scope.contactType = appConfig.possibility.contactType;
            $scope.supportArea = appConfig.suspect.supportArea;
            $scope.point_of_contacts = [{
                name: "",
                designation: "",
                phone: "",
                email_id: "",
                contact_type: $scope.getCopy(appConfig.suspect.contactType),
                isOpen: true,
                support_area: angular.copy(appConfig.suspect.supportArea),
                support_location:'',
                support_type:''
            }];
            //$scope.support_array=[appConfig.suspect.supportArea];

        };
        $scope.init();
        $scope.isEditable=false;
        $scope.contactType = appConfig.suspect.contactType;
        $scope.supportArea = appConfig.suspect.supportArea;
        $scope.status = appConfig.suspect.status;
        $scope.createPossibility = {};
        $scope.title = "Client Information";
        
        if ($stateParams.suspect) {
            $scope.accessType=$stateParams.suspect.access_type;
            $scope.myPromise = suspectService.getSuspectById($stateParams.suspect.client_unit_id).then(function (response) {
                console.log(response.data);
                $scope.createPossibility = response.data;
                $scope.suspect = {};
                $scope.suspect = response.data.point_of_contacts[0];
               // $scope.support_type_local=false;
                //$scope.support_type_remote=false;
                //$scope.suspect_support_type=$scope.suspect.support_type;
                $scope.createPossibility.employee_size = $scope.getSelectedItem($scope.createPossibility.employee_size, $scope.employeeSize).displayText;
                $scope.createPossibility.turnover = $scope.getSelectedItem($scope.createPossibility.turnover, $scope.groupTurnover).displayText;
                $scope.createPossibility.vertical = $scope.getSelectedItem($scope.createPossibility.vertical, $scope.businessVertical).displayText;
                $scope.createPossibility.customer_type = $scope.getSelectedItem($scope.createPossibility.customer_type, $scope.customerType).displayText;
                /*$scope.createPossibility.POC =$scope.suspect;*/
                $scope.status.selectedItem = $scope.getSelectedItem($scope.createPossibility.current_status.status, $scope.status);
                /*$scope.point_of_contacts=$scope.createPossibility.point_of_contacts;*/
                $scope.createPossibility.point_of_contacts.map(function (Obj) {
                    var i = 0;
                    $("#contact" + i + ' .is-empty').removeClass('is-empty');
                    $scope.point_of_contacts[i]._id=Obj._id;
                    $scope.point_of_contacts[i].user_id=Obj.user_id;
                    $scope.point_of_contacts[i].name = Obj.name;
                    $scope.point_of_contacts[i].email_id = Obj.email_id;
                    $scope.point_of_contacts[i].designation = Obj.designation;
                    $scope.point_of_contacts[i].phone = Obj.phone;
                    $scope.point_of_contacts[i].contact_type.selectedItem = $scope.getSelectedItem(Obj.contact_type, $scope.contactType);
                    $scope.point_of_contacts[i].support_area.selectedItem = $scope.getSelectedItem(Obj.support_area, $scope.supportArea);
                    if ($scope.point_of_contacts[i].contact_type.selectedItem.key === 'PRIMARY') {
                        $("#contact" + i + ' .select ul').remove();
                        $("#contact" + i + ' .select .placeholder').addClass('default-cursor');
                    }
                    if(Obj.support_type==='LOCAL') {
          $scope.point_of_contacts[i].local=true;
        }
        else if(Obj.support_type==='REMOTE'){
          $scope.point_of_contacts[i].remote=true;
        }
        else if(Obj.support_type==='BOTH'){
          $scope.point_of_contacts[i].local = true;
          $scope.point_of_contacts[i].remote=true;
        }
                    $scope.point_of_contacts[i].support_location=Obj.support_location;
                    if (i > 0) {
                        $scope.createNewContactList();
                    }
                    i = i + 1;
                });
            });
        } else {
            $state.go('app.suspect-view');
        }
        $scope.disableForm = function () {
            if (!$scope.isEditable && !$scope.isNewPossibility) {
                var className = 'app-container-blur';
                return className;
            }

        };
        /*$scope.editForm = function () {
            if ($scope.createPossibility.isProspect !== true) {
                $scope.isEditable = true;

            }

        };*/


        $scope.showRollOut = false;
        $scope.$watch('status.selectedItem', function (n, o) {
            if (n.key === 'HOT') {
                $scope.showRollOut = true;
            } else {
                $scope.showRollOut = false;
            }
        });
        $scope.createNewContactList = function () {
            var obj = {
                name: "",
                designation: "",
                phone: "",
                email_id: "",
                contact_type: $scope.getCopy(appConfig.suspect.contactType),
                isOpen: true,
                support_area: angular.copy(appConfig.suspect.supportArea),
                support_location:''
            };
            $scope.point_of_contacts.push(obj);
            //$scope.support_array.push($scope.getCopy(appConfig.suspect.supportArea));
        };

        $scope.cancel = function () {
            $state.go('app.suspect-view');
        };

        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.uploadPromise;
        $scope.uploadFiles = [];
        $scope.upload = function (files) {
            $scope.uploadFiles = [];
          $scope.fileNameLen = files[0].name.length-3;
          $scope.fileFormat = files[0].name.substring($scope.fileNameLen);
          if($scope.fileFormat=='pdf' || $scope.fileFormat=='ocx' || $scope.fileFormat=='ptx') {
            if (files && files.length) {
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                  $scope.uploadPromise = Upload.upload({
                    url: appConfig.apiUrl + '/api/upload/file',
                    data: {
                      content: file
                    }
                  }).then(function (resp) {
                    file.url = resp.data.url;
                    file.documentType = angular.copy(appConfig.possibility.documentType);
                    $scope.uploadFiles.push(file);
                    $scope.fileName = file.name;
                    if (file.name.length > 7) {
                      $scope.fileNamePart1 = file.name.substring(0, 12);
                      $scope.fileNameLen = file.name.length - 7;
                      $scope.fileNamePart2 = file.name.substring($scope.fileNameLen);
                      $scope.fileName = $scope.fileNamePart1 + '...' + $scope.fileNamePart2
                      console.log($scope.fileName);
                    }
                  }, null, function (evt) {

                  });
                }
              }
            }
            }
          else{
            CoreService.toastError('ERROR', 'please select supported file format only eg: pdf,docx,pptx');
            document.getElementById("inputText").value = "";

          }
        };
        $scope.submit = function (bool) {
            if (bool) {
                $scope.submitPromise = asyncSubmit();
            }
        };
//Update Suspect
        function asyncSubmit() {
            return $q(function () {
                var procObj = {};
                var poc = [];
                var files = [];
                $scope.point_of_contacts.map(function (pocObj) {
                    var requestPocObject = {};
                    if(pocObj._id){
                    requestPocObject._id = pocObj._id;
                        }
                    requestPocObject.contact_type = pocObj.contact_type.selectedItem ? pocObj.contact_type.selectedItem.key : null;
                    if(pocObj.user_id){
                    requestPocObject.user_id = pocObj.user_id;
                        }
                    requestPocObject.name = pocObj.name;
                    requestPocObject.email_id = pocObj.email_id;
                    requestPocObject.support_area = pocObj.support_area.selectedItem ? pocObj.support_area.selectedItem.key : null;
                    requestPocObject.designation = pocObj.designation;
                    requestPocObject.phone = pocObj.phone;

                    if(pocObj.local===true && pocObj.remote===true){
                        requestPocObject.support_type='BOTH';
                    }else if(pocObj.local===true) {
          requestPocObject.support_type='LOCAL';
        }else if(pocObj.remote===true){
          requestPocObject.support_type='REMOTE';
        }
                    requestPocObject.support_location=pocObj.support_location;
                    poc.push(requestPocObject);
                });

                procObj.client_unit_id = $scope.createPossibility._id;
                procObj.status = {
                    current_status_id: $scope.createPossibility.current_status._id,
                    status: $scope.status.selectedItem.key
                };
                $scope.uploadFiles.map(function (obj) {
                    var file = {};
                    file.url = obj.url;
                    file.type = obj.documentType.selectedItem.key;
                    files.push(file);
                });
                if (files.length > 0) {
                    procObj.document = files;
                }

                procObj.point_of_contacts = poc;
                procObj.user_id = JSON.parse($cookies.userData).userDetails._id;
                console.log(procObj);
                $scope.myPromise = suspectService.suspectUpdate(procObj).then(function (response) {
                    /*CoreService.toastSuccess('','SUSPECT Updated Successfully.');*/
                    console.log(response.data);
                    $state.go('app.suspect-view');
                });
                //console.log($scope.point_of_contacts);
                /*console.log($scope.support_array);*/
            });
        }
        $scope.getSelectedItem = function (selectedItem, srcObj) {
            var returnObj;
            angular.forEach(srcObj.data, function (obj) {
                if (obj.displayText === selectedItem || obj.key === selectedItem) {
                    returnObj = obj;
                }
            });
            return returnObj;
        };
        $scope.removeFiles = function (index) {
            $scope.uploadFiles.splice(index, 1);
        };

$scope.editForm = function () {
    if ($scope.createPossibility.isProspect !== true || $scope.accessType==='VIEW') {
                $scope.isEditable = true;
    }
        };
        $scope.isValid = function (val) {
            var c1=true;
            if ($scope.point_of_contacts.length>0) {
                    for (var i = 0; i < $scope.point_of_contacts.length; i++) {
                        if(!($scope.point_of_contacts[i].contact_type.selectedItem && $scope.point_of_contacts[i].support_area.selectedItem)){
                            c1=false;
                            break;
                        }
                    }
                }
            return (val && c1);

        };
      /*$scope.$watch('suspect_support_type',function(n,o){
        if(n==='LOCAL') {
          $scope.poc.local=true;
        }
        else if(n==='REMOTE'){
          $scope.poc.remote=true;
        }
        else if(n==='BOTH')
        {
          $scope.poc.local = true;
          $scope.poc.remote=true;
        }
      }) ;*/
  }]);
