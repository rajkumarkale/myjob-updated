angular.module('com.module.possibility')
    .controller('createPossibilityController', ['$scope', 'toaster', '$state', '$stateParams', 'FileUploader', 'possibilityCreateService', 'Upload', '$modal', 'appConfig', '$cookies', '$q', 'CoreService', '$filter', '$timeout', function ($scope, toaster, $state, $stateParams, FileUploader, possibilityCreateService, Upload, $modal, appConfig, $cookies, $q, CoreService, $filter, $timeout) {
        $scope.init = function ($stateParams) {
            $scope.isEditable = false;
            $scope.employeeSize = appConfig.possibility.employeeSize;
            $scope.groupTurnover = appConfig.possibility.groupTurnover;
            $scope.businessVertical = appConfig.possibility.businessVertical;
            $scope.customerType = appConfig.possibility.customerType;
            $scope.contactType = appConfig.possibility.contactType;
            $scope.status = appConfig.possibility.status;
            $scope.typeOfDiscussion = appConfig.discussion.typeOfDiscussion;

            $scope.discussion = {};
            $scope.documentTypes;
            $scope.uploadFiles = [];
             $scope.uploadFile=[];
            if ($stateParams.possibility) {
                $scope.title = "Possibility";
                $scope.myPromise = possibilityCreateService.possibilityDetails($stateParams.possibility.client_unit_id).then(function (response) {
                    $scope.createPossibility = response.data;
                    console.log(response.data);
                    $scope.client_unit_id = $scope.createPossibility.point_of_contacts[0].client_unit_id;
                    $scope.point_of_contacts = $scope.createPossibility.point_of_contacts;
                    $scope.createPossibility.freeze = $scope.createPossibility.client_freeze_details ? true : false;
                    $scope.employeeSize.selectedItem = $scope.getSlectedItem($scope.createPossibility.employee_size, $scope.employeeSize);
                    $scope.groupTurnover.selectedItem = $scope.getSlectedItem($scope.createPossibility.turnover, $scope.groupTurnover);
                    $scope.businessVertical.selectedItem = $scope.getSlectedItem($scope.createPossibility.vertical, $scope.businessVertical);
                    $scope.customerType.selectedItem = $scope.getSlectedItem($scope.createPossibility.customer_type, $scope.customerType);
                    $scope.status.selectedItem = $scope.getSlectedItem($scope.createPossibility.current_status.status, $scope.status);

                    $scope.point_of_contacts.map(function (pocObject) {
                        if (pocObject.contact_type !== 'PRIMARY') {
                            var selectedItem = pocObject.contact_type;
                            pocObject.contact_type = appConfig.possibility.contactType;
                            pocObject.contact_type.selectedItem = $scope.getSlectedItem(selectedItem, pocObject.contact_type);

                        }
                        pocObject.isOpen = true;
                        if (pocObject.support_type === 'BOTH') {
                            pocObject.remote = true;
                            pocObject.local = true;
                        } else if (pocObject.support_type === 'REMOTE') {
                            pocObject.remote = true;
                        } else {
                            if (pocObject.support_type === 'LOCAL') {
                                pocObject.local = true;
                            }
                        }
                    });

                    $scope.discussion.name = $scope.createPossibility.discussion.contact_person;
                    $scope.discussion.venue = $scope.createPossibility.discussion.venue;
                    $scope.discussion.text = $scope.createPossibility.discussion.text;
                    var time = $filter('date')($scope.createPossibility.discussion.time_of_discussion * 1000, 'HH:mm a');
                    var date = $filter('date')($scope.createPossibility.discussion.time_of_discussion * 1000, 'MM/dd/yyyy');
                    $scope.discussion.date = date;
                    $timeout(function () {
                        $("#dname").removeClass('is-empty');
                        $("#dvenue").removeClass('is-empty');
                        $('#myTime').val(time);
                    }, 1000);
                    $scope.typeOfDiscussion.selectedItem = $scope.getSlectedItem($scope.createPossibility.discussion.mode, $scope.typeOfDiscussion);
                    //console.log($scope.point_of_contacts);
                    $scope.isNewPossibility = false;
                });
            } else {
                $scope.isNewPossibility = true;
                $scope.title = "New Possibility";
                $scope.createPossibility = {};
                $scope.createPossibility.discussion = {};
                $scope.employeeSize.selectedItem ='';
                $scope.groupTurnover.selectedItem='';
                $scope.businessVertical.selectedItem='';
                $scope.customerType.selectedItem='';
                $scope.status.selectedItem = {
                    "key": "NOT_MET",
                    "displayText": "NOT MET"
                };
                $scope.point_of_contacts = [{
                    name: "",
                    designation: "",
                    remote: "",
                    local: "",
                    phone: "",
                    support_location: "",
                    email_id: "",
                    contact_type: "PRIMARY",
                    isOpen: true,
                    department: ""
                }];
                $timeout(function () {
                    $('#stat .select ul').remove();
                    $('#stat .select .placeholder').addClass('default-cursor');
                }, 1000);
            }
        };

        $scope.init($stateParams);
        $scope.$watch('isEditable',function(){

        });

        $scope.getNewPointofContact = function () {
            var obj = angular.copy({
                name: "",
                designation: "",
                remote: "",
                local: "",
                phone: "",
                support_location: "",
                email_id: "",
                contact_type: appConfig.possibility.contactType,
                isOpen: true,
                department: ""
            });
            $scope.point_of_contacts.map(function (obj) {
                obj.isOpen = false;
            });
            $scope.point_of_contacts.push(obj);

        };
        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function () {
            /*if ($scope.file != null) {
                $scope.files = [$scope.file];
            }*/
            $scope.uploads($scope.file);
        });
        $scope.createClient = function () {
            var modalInstance = $modal.open({
                templateUrl: 'js/app/possibility/views/create-client.html',
                backdrop: 'static',
                controller: 'createClientModalInstanceCtrl',
                size: 'lg'
            });
            modalInstance.result.then(function () {});
        };
        $scope.onClose = function () {
            if ($scope.isEditable !== true) {
                $state.go('app.viewPossibility');
            } else {
                var modalInstance = $modal.open({
                    templateUrl: 'js/app/possibility/views/on-close-modal.html',
                    backdrop: 'static',
                    controller: 'createClientModalInstanceCtrl',
                    size: 'sm'
                });
                modalInstance.result.then(function () {});
            }
        };
//On clicking Update or Save button
        $scope.save = function (possibilityObject) {
          document.getElementById('noEdit').style.pointerEvents = 'none';
            if (possibilityObject) {
                if ($scope.isNewPossibility) {
                    $scope.createPromise = asyncProcessRequest(possibilityObject);
                } else {
                    $scope.savePromise = asyncSave(possibilityObject);
                }
            }
        };
//Updating Existing Possibility
        function asyncSave(possibilityObject) {
            return $q(function () {

                var status = {
                    current_status_id: possibilityObject.current_status._id,
                    status: $scope.status.selectedItem.key
                };
                possibilityObject.employee_size = $scope.employeeSize.selectedItem.key;
                possibilityObject.turnover = $scope.groupTurnover.selectedItem.key;
                possibilityObject.vertical = $scope.businessVertical.selectedItem.key;
                possibilityObject.customer_type = $scope.customerType.selectedItem.key;
                possibilityObject.client_unit_id = $scope.client_unit_id;
                possibilityObject.status = status;
                possibilityObject.user_id =JSON.parse($cookies.userData).userDetails._id ;
                possibilityObject.point_of_contacts = [];
                possibilityObject.urls = [];
                if ($scope.uploadFiles && $scope.uploadFiles.length) {
                    for (var i = 0; i < $scope.uploadFiles.length; i++) {
                        var obj = {};
                        obj.url = $scope.uploadFiles[i].url;
                        obj.type = $scope.uploadFiles[i].documentType.selectedItem.key;
                        possibilityObject.urls.push(obj);
                    }
                }

                $scope.point_of_contacts.map(function (pocObj) {
                    var requestPocObject = {};
                    if(pocObj._id){
                    requestPocObject._id = pocObj._id;
                        }
                    requestPocObject.name = pocObj.name;
                    requestPocObject.phone = pocObj.phone;
                    requestPocObject.designation = pocObj.designation;
                    requestPocObject.department = pocObj.department;
                    requestPocObject.email_id = pocObj.email_id;
                    requestPocObject.support_location = pocObj.support_location;
                    if(pocObj.user_id){
                    requestPocObject.user_id = pocObj.user_id;
                        }
                    requestPocObject.contact_type = pocObj.contact_type.selectedItem ? pocObj.contact_type.selectedItem.key : pocObj.contact_type;

                    if (pocObj.remote && pocObj.local) {
                        requestPocObject.support_type = 'BOTH';
                    } else if (pocObj.remote) {
                        requestPocObject.support_type = 'REMOTE';
                    } else {
                        if (pocObj.local) {
                            requestPocObject.support_type = 'LOCAL';
                        }
                    }
                    possibilityObject.point_of_contacts.push(requestPocObject);

                });
                delete possibilityObject._id;
                delete possibilityObject.created_by;
                delete possibilityObject.time_created;
                delete possibilityObject.freeze;
                delete possibilityObject.address.time_updated;
                delete possibilityObject.time_updated;
                delete possibilityObject.address.user_id;
                delete possibilityObject.documents;
                delete possibilityObject.current_status;
                delete possibilityObject.client_freeze_details;
                delete possibilityObject.division;
                delete possibilityObject.discussion;
                delete possibilityObject.transferred_by;
                possibilityCreateService.updatePossibility(possibilityObject).success(function () {
                   /* CoreService.toastSuccess('', 'POSSIBILITY Updated Successfully.');*/
                    $state.go('app.viewPossibility');
                }).error(function (err) {
                    $scope.authError = err.message;
                });

            });
        }


        $scope.isValid = function (val) {
            var c1;
            var c2=true;
            c1= (val && ($scope.businessVertical.selectedItem && $scope.employeeSize.selectedItem && $scope.groupTurnover.selectedItem &&
                $scope.customerType.selectedItem));
            if ($scope.uploadFiles && $scope.uploadFiles.length) {
                    for (var i = 0; i < $scope.uploadFiles.length; i++) {

                        if(!$scope.uploadFiles[i].documentType.selectedItem.key){
                            c2=false;
                        }
                    }
                }
            return (c1 && c2);

        };

//Creating new possibility
        function asyncProcessRequest(requestObject) {
            return $q(function () {
                requestObject.user_id = JSON.parse($cookies.userData).userDetails._id;
                requestObject.employee_size = $scope.employeeSize.selectedItem.key;
                requestObject.turnover = $scope.groupTurnover.selectedItem.key;
                requestObject.vertical = $scope.businessVertical.selectedItem.key;
                requestObject.customer_type = $scope.customerType.selectedItem.key;
                requestObject.urls = [];
                requestObject.point_of_contacts = [];
                if ($scope.uploadFiles && $scope.uploadFiles.length) {
                    for (var i = 0; i < $scope.uploadFiles.length; i++) {
                        var obj = {};
                        obj.url = $scope.uploadFiles[i].url;
                        obj.type = $scope.uploadFiles[i].documentType.selectedItem.key;
                        requestObject.urls.push(obj);
                    }
                }
                requestObject.discussion.mode = $scope.typeOfDiscussion.selectedItem.key;
                requestObject.discussion.discussed_by = JSON.parse($cookies.userData).userDetails._id;
                requestObject.discussion.contact_person = $scope.discussion.name;
                var time = $filter('date')($scope.discussion.time, 'HH:mm:ss');
                var date = $filter('date')($scope.discussion.date, 'MM/dd/yyyy');
                var dtstring = date + ' ' + time;
                var timestamp = Math.round(new Date(dtstring).getTime() / 1000);
                requestObject.discussion.time_of_discussion = timestamp;
                requestObject.discussion.venue = $scope.discussion.venue;
                requestObject.discussion.text = $scope.discussion.text;
                /*requestObject.discussion.type='FRESH';*/
                if($scope.uploadFile.length>0){
                    requestObject.discussion.documents=[$scope.uploadFile[0][0].url];
                }

                $scope.point_of_contacts.map(function (pocObj) {
                    var requestPocObject = {};
                    requestPocObject.name = pocObj.name;
                    requestPocObject.phone = pocObj.phone;
                    requestPocObject.designation = pocObj.designation;
                    requestPocObject.email_id = pocObj.email_id;
                    requestPocObject.department = pocObj.department;
                    requestPocObject.support_location = pocObj.support_location;
                    requestPocObject.contact_type = pocObj.contact_type.selectedItem ? pocObj.contact_type.selectedItem.key : pocObj.contact_type;
                    if (pocObj.remote && pocObj.local) {
                        requestPocObject.support_type = 'BOTH';
                    } else if (pocObj.remote) {
                        requestPocObject.support_type = 'REMOTE';
                    } else {
                       /* if (pocObj.local) {*/
                            requestPocObject.support_type = 'LOCAL';
                        /*}*/
                    }
                    requestObject.point_of_contacts.push(requestPocObject);

                });
                console.log(requestObject);
                var possibilityCreatePromise = possibilityCreateService.setPossibility(requestObject).success(function () {

                    $state.go('app.viewPossibility');
                    /*CoreService.toastSuccess('', 'POSSIBILITY Created Successfully.');*/
                }).error(function (err) {
                    $scope.authError = err.message;

                })
            })
        };


        $scope.getSlectedItem = function (selectedItem, srcObj) {
            var returnObj;
            angular.forEach(srcObj.data, function (obj) {
                if (obj.displayText === selectedItem || obj.key === selectedItem) {
                    returnObj = obj;
                }
            });
            return returnObj;

        };
        $scope.editForm = function () {
            if ($scope.createPossibility.current_status.status !== "MET") {
                $scope.isEditable = true;
                $scope.title = "Edit Possibility";
            }

        };

        $scope.cancel = function () {
            $state.go('app.viewPossibility');
        };
        $scope.disableForm = function () {
            if (!$scope.isEditable && !$scope.isNewPossibility) {
                var className = 'app-container-blur';
                return className;
            }
        };
        $scope.uploadPromise;
        $scope.upload = function (files) {
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
                                $scope.fileNamePart1 = file.name.substring(0, 8);
                                $scope.fileNameLen = file.name.length - 7;
                                $scope.fileNamePart2 = file.name.substring($scope.fileNameLen);
                                $scope.fileName = $scope.fileNamePart1 + '...' + $scope.fileNamePart2
                                console.log($scope.fileName + ' ' + file.name);
                            }
                        }, null, function (evt) {

                        });
                    }
                }
            }
        };
        $scope.uploadsPromise;
        $scope.uploads = function(file) {
            $scope.uploadFile=[];
            if (file && file.length) {
                for (var i = 0; i < file.length; i++) {
                    var _file = file[i];
                    if (!_file.$error) {
                      $scope.uploadsPromise=  Upload.upload({
                            url: appConfig.apiUrl+'/api/upload/file',
                            data: {
                                content: _file
                            }
                        }).then(function(resp) {
                          _file.url = resp.data.url;
                          _file.documentType = angular.copy(appConfig.possibility.documentType);
                          $scope.uploadFile.push(file);

                          $scope.fileName=_file.name;

                          /*if (file.name.length > 7 ) {
                          $scope.fileNamePart1 = file.name.substring(0, 8);
                          $scope.fileNameLen = file.name.length - 7;
                          $scope.fileNamePart2 = file.name.substring($scope.fileNameLen);
                          $scope.fileName = $scope.fileNamePart1 + '...' + $scope.fileNamePart2
                          console.log($scope.fileName+' '+file.name);
                        }*/
                        }, null, function(evt) {

                        });
                    }
                }
            }
        };
        $scope.toggleOpen = function (poc) {
            return poc.isOpen = !poc.isOpen;
        };
        $scope.removeFiles = function (index) {
            if ($scope.isEditable !== true) {
               /* CoreService.toastSuccess('', 'File Removed Successfully');*/
                return $scope.uploadFiles.splice(index, 1);
            } else {
                var id = $scope.createPossibility.documents[index]._id;
                possibilityCreateService.deleteDocument(id).then(function (response) {
                    /*CoreService.toastSuccess('', 'File Removed Successfully');*/
                    $scope.createPossibility.documents.splice(index, 1);
                });
            }

        };
        $scope.open = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened1 = !$scope.opened1;
        };
        

    }]);
