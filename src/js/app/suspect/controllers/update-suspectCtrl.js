/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
    .controller('updateSuspectCtrl', ['$scope', 'appConfig', '$modal', '$stateParams', 'suspectService', '$http', '$state', 'Upload', '$q', 'CoreService', '$cookies', '$timeout', function ($scope, appConfig, $modal, $stateParams, suspectService, $http, $state, Upload, $q, CoreService, $cookies, $timeout) {
        $scope.met_status = 'MET';
        $scope.status = {
            open: true
        };
        $scope.getCopy = function (obj) {
            return angular.copy(obj);
        };

        $scope.getNames = function (val) {
            return $http({
                method: 'GET',
                url: 'http://myjobs-node-server-dev.herokuapp.com' + '/api/users?name=' + val
            }).then(function (response) {
                return response.data.users;
            });
            /*suspectService.getNames(val).then(function(response){
              return response.data.users;
          });*/
        };

        $scope.suspectTitle='Contact Details';
        $scope.setdata = function ($item, $model, $label, $event, $index) {

            var x = $item.poc_details;
            if (x) {
                $("#contact" + $index + ' .is-empty').removeClass('is-empty');
                $scope.point_of_contacts[$index]._id = x._id;
                $scope.point_of_contacts[$index].user_id = x.user_id;
                $scope.point_of_contacts[$index].name = x.name;
                $scope.point_of_contacts[$index].phone = x.phone;
                $scope.point_of_contacts[$index].email_id = x.email_id;
                $scope.point_of_contacts[$index].designation = x.designation;
                $scope.point_of_contacts[$index].contact_type.selectedItem = $scope.getSelectedItem(x.contact_type, $scope.contactType);
                $scope.point_of_contacts[$index].support_area.selectedItem = $scope.getSelectedItem(x.support_area, angular.copy(appConfig.suspect.supportArea));
                $scope.point_of_contacts[$index].support_location = x.support_location;
                if (x.support_type === 'LOCAL') {
                    $scope.point_of_contacts[$index].local = true;
                } else if (x.support_type === 'REMOTE') {
                    $scope.point_of_contacts[$index].remote = true;
                } else if (x.support_type === 'BOTH') {
                    $scope.point_of_contacts[$index].local = true;
                    $scope.point_of_contacts[$index].remote = true;
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
            $scope.contactType = appConfig.suspect.contactType;
            //$scope.supportArea = appConfig.suspect.supportArea;
            $scope.status = appConfig.suspect.status;
            //$scope.contactType = appConfig.possibility.contactType;
            $scope.supportArea = appConfig.suspect.supportArea;
            $scope.point_of_contacts = [{
                name: "",
                designation: "",
                phone: "",
                email: "",
                contactType: $scope.getCopy(appConfig.suspect.contactType),
                isOpen: true,
                supportArea: angular.copy(appConfig.suspect.supportArea),
                supportLocation: '',
                supportType: ''
            }];
        };

        $scope.init();

        $scope.isEditable = false;

        $scope.createPossibility = {};
        $scope.title = "Client Information";
        $scope.getSelectedItem = function (selectedItem, srcObj) {
            var returnObj;
            angular.forEach(srcObj.data, function (obj) {
                if (obj.displayText === selectedItem || obj.key === selectedItem) {
                    returnObj = obj;
                }
            });
            return returnObj;
        };

        $scope.createNewContactList = function () {
            var obj = {
                name: "",
                designation: "",
                phone: "",
                email: "",
                contactType: $scope.getCopy(appConfig.suspect.contactType),
                isOpen: true,
                supportArea: angular.copy(appConfig.suspect.supportArea),
                supportLocation: '',
                supportType: ''
            };
            $scope.point_of_contacts.push(obj);
            //$scope.support_array.push($scope.getCopy(appConfig.suspect.supportArea));
        };

        if ($stateParams.suspect) {
            /*$scope.accessType=$stateParams.suspect.access_type;
            $scope.myPromise = suspectService.getSuspectById($stateParams.suspect.client_unit_id).then(function (response) {
                console.log(response.data);*/
            $scope.createPossibility = $stateParams.suspect;
            $scope.suspect = $stateParams.suspect;
            // $scope.suspect = response.data.point_of_contacts[0];
            // $scope.support_type_local=false;
            //$scope.support_type_remote=false;
            //$scope.suspect_support_type=$scope.suspect.support_type;
            $scope.createPossibility.employeeSize = $scope.getSelectedItem($scope.createPossibility.client.employeeSize, $scope.employeeSize).displayText;
            $scope.createPossibility.turnover = $scope.getSelectedItem($scope.createPossibility.client.turnover, $scope.groupTurnover).displayText;
            $scope.createPossibility.vertical = $scope.getSelectedItem($scope.createPossibility.client.vertical, $scope.businessVertical).displayText;
            $scope.createPossibility.customerType = $scope.getSelectedItem($scope.createPossibility.client.customerType, $scope.customerType).displayText;
            /*$scope.createPossibility.POC =$scope.suspect;*/
            $scope.status.selectedItem = $scope.getSelectedItem($scope.createPossibility.suspect, $scope.status);
            /*$scope.point_of_contacts=$scope.createPossibility.point_of_contacts;*/
            $scope.createPossibility.pointOfContacts.map(function (Obj, i) {
                if (i > 0) {
                    $scope.createNewContactList();
                }
                $timeout(function () {
                    $("#contact" + i + ' .is-empty').removeClass('is-empty');
                }, 10);
                /*$scope.point_of_contacts[i]._id=Obj._id;
                $scope.point_of_contacts[i].user_id=Obj.user_id;*/
                $scope.point_of_contacts[i].name = Obj.name;
                $scope.point_of_contacts[i].email = Obj.email;
                $scope.point_of_contacts[i].designation = Obj.designation;
                $scope.point_of_contacts[i].phone = Obj.phone;
                $scope.point_of_contacts[i].contactType.selectedItem = $scope.getSelectedItem(Obj.contactType, $scope.contactType);
                $scope.point_of_contacts[i].supportArea.selectedItem = $scope.getSelectedItem(Obj.supportArea, $scope.supportArea);
                if ($scope.point_of_contacts[i].contactType.selectedItem.key === 'PRIMARY') {
                    $timeout(function () {
                        $("#contact" + i + ' .select ul').remove();
                        $("#contact" + i + ' .select .placeholder').addClass('default-cursor');
                    }, 100);

                }
                if (Obj.supportType === 'LOCAL') {
                    $scope.point_of_contacts[i].local = true;
                } else if (Obj.supportType === 'REMOTE') {
                    $scope.point_of_contacts[i].remote = true;
                } else if (Obj.supportType === 'BOTH') {
                    $scope.point_of_contacts[i].local = true;
                    $scope.point_of_contacts[i].remote = true;
                }
                $scope.point_of_contacts[i].supportLocation = Obj.supportLocation;
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
            $scope.fileNameLen = files[0].name.length - 3;
            $scope.fileFormat = files[0].name.substring($scope.fileNameLen);
            if ($scope.fileFormat == 'pdf' || $scope.fileFormat == 'ocx' || $scope.fileFormat == 'ptx' || $scope.fileFormat == 'jpg' || $scope.fileFormat == 'png' || $scope.fileFormat == 'peg') {
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
            } else {
                CoreService.toastError('ERROR', 'please select supported file format only eg: pdf,docx,pptx');
                document.getElementById("inputText").value = "";

            }
        };
        
        $scope.submit = function (suspect) {
            if (suspect) {
                $scope.submitPromise = asyncSubmit(suspect);
            }
        };
        //Update Suspect
        function asyncSubmit() {
            return $q(function () {
                var procObj = {};
                suspect.pointOfContacts= [];
                var files = [];
                $scope.point_of_contacts.map(function (pocObj) {
                    var obj = {};
                    if (pocObj._id) {
                        obj._id = pocObj._id;
                    }
                    obj.contactType = pocObj.contactType.selectedItem ? pocObj.contactType.selectedItem.key : null;
                    if (pocObj.user_id) {
                        obj.user_id = pocObj.user_id;
                    }
                    obj.name = pocObj.name;
                    obj.email = pocObj.email;
                    obj.supportArea = pocObj.supportArea.selectedItem ? pocObj.supportArea.selectedItem.key : null;
                    obj.designation = pocObj.designation;
                    obj.phone = pocObj.phone;

                    if (pocObj.local === true && pocObj.remote === true) {
                        obj.supportType = 'BOTH';
                    } else if (pocObj.local === true) {
                        obj.supportType = 'LOCAL';
                    } else if (pocObj.remote === true) {
                        obj.supportType = 'REMOTE';
                    }
                    requestPocObject.supportLocation = pocObj.supportLocation;
                    suspect.pointOfContacts.push(obj);
                });
                suspect.suspect=$scope.status.selectedItem.key;
                /*procObj.client_unit_id = $scope.createPossibility._id;
                procObj.status = {
                    current_status_id: $scope.createPossibility.current_status._id,
                    status: $scope.status.selectedItem.key
                };*/
                $scope.uploadFiles.map(function (obj) {
                    var file = {};
                    file.url = obj.url;
                    file.type = obj.documentType.selectedItem.key;
                    files.push(file);
                });
                if (files.length > 0) {
                    procObj.document = files;
                }
                //procObj.user_id = JSON.parse($cookies.userData).userDetails._id;
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

        $scope.removeFiles = function (index) {
            $scope.uploadFiles.splice(index, 1);
        };

        $scope.editForm = function () {
            if ($scope.createPossibility.isProspect !== true && $scope.accessType !== 'view') {
                $scope.isEditable = true;
                $scope.suspectTitle='Edit Contact Details';
            }
        };
        $scope.isValid = function (val) {
            var c1 = true;
            if ($scope.point_of_contacts.length > 0) {
                for (var i = 0; i < $scope.point_of_contacts.length; i++) {
                    if (!($scope.point_of_contacts[i].contactType.selectedItem && $scope.point_of_contacts[i].supportArea.selectedItem)) {
                        c1 = false;
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
        $scope.removeContact = function (index) {
            $scope.point_of_contacts.splice(index, 1);
        };
  }]);