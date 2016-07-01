/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
    .controller('updateSuspectCtrl', ['$scope', 'appConfig', '$modal', '$stateParams', 'suspectService', '$http', '$state', 'Upload', '$q','CoreService', function ($scope, appConfig, $modal, $stateParams, suspectService, $http, $state, Upload, $q,CoreService) {
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
                })
                /*suspectService.getNames(val).then(function(response){
              return response.data.users;
          });*/
        };


        $scope.setdata = function ($item, $model, $label, $event, $index) {

            var x = $item.poc_details;
            if (x) {
                $("#contact" + $index + ' .is-empty').removeClass('is-empty');
                $scope.point_of_contacts[$index].name = x.name;
                $scope.point_of_contacts[$index].phone = x.phone;
                $scope.point_of_contacts[$index].email_id = x.email_id;
                $scope.point_of_contacts[$index].designation = x.designation;
                $scope.point_of_contacts[$index].contact_type.selectedItem = $scope.getSelectedItem(x.contact_type, $scope.contactType);
                $scope.point_of_contacts[$index].support_area.selectedItem = $scope.getSelectedItem(x.support_area, angular.copy(appConfig.suspect.supportArea));
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
                support_area: angular.copy(appConfig.suspect.supportArea)
            }];
            //$scope.support_array=[appConfig.suspect.supportArea];

        };
        $scope.init();
        $scope.contactType = appConfig.suspect.contactType;
        $scope.supportArea = appConfig.suspect.supportArea;
        $scope.status = appConfig.suspect.status;
        $scope.createPossibility = {};
        $scope.title = "Client Information";
        if ($stateParams.suspect) {
            $scope.myPromise = suspectService.getSuspectById($stateParams.suspect.client_unit_id).then(function (response) {
                console.log(response.data);
                $scope.createPossibility = response.data;
                $scope.suspect = {};
                $scope.suspect = response.data.point_of_contacts[0];
                $scope.createPossibility.employee_size = $scope.getSelectedItem($scope.createPossibility.employee_size, $scope.employeeSize).displayText;
                $scope.createPossibility.turnover = $scope.getSelectedItem($scope.createPossibility.turnover, $scope.groupTurnover).displayText;
                $scope.createPossibility.vertical = $scope.getSelectedItem($scope.createPossibility.vertical, $scope.businessVertical).displayText;
                $scope.createPossibility.customer_type = $scope.getSelectedItem($scope.createPossibility.customer_type, $scope.customerType);
                /*$scope.createPossibility.POC =$scope.suspect;*/
                $scope.status.selectedItem = $scope.getSelectedItem($scope.createPossibility.current_status.status, $scope.status);
                $scope.createPossibility.point_of_contacts.map(function (Obj) {
                    var i = 0;
                    $("#contact" + i + ' .is-empty').removeClass('is-empty');
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
        $scope.editForm = function () {
            if ($scope.createPossibility.current_status.status !== "COLD") {
                $scope.isEditable = true;

            }

        };


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
                support_area: angular.copy(appConfig.suspect.supportArea)
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
        $scope.uploadFiles = [];
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
        };
        $scope.submit = function (bool) {
            if (bool) {
                $scope.submitPromise = asyncSubmit();
            }
        };

        function asyncSubmit() {
            return $q(function () {
                var procObj = {};
                var poc = [];
                var files = [];
                $scope.point_of_contacts.map(function (pocObj) {
                    var requestPocObject = {};
                    requestPocObject._id = $scope.createPossibility.point_of_contacts[0]._id;
                    requestPocObject.contact_type = pocObj.contact_type.selectedItem ? pocObj.contact_type.selectedItem.key : null;
                    requestPocObject.user_id = $scope.createPossibility.point_of_contacts[0].user_id;
                    requestPocObject.name = pocObj.name;
                    requestPocObject.email_id = pocObj.email_id;
                    requestPocObject.support_area = pocObj.support_area.selectedItem ? pocObj.support_area.selectedItem.key : null;
                    requestPocObject.designation = pocObj.designation;
                    requestPocObject.phone = pocObj.phone;
                    poc.push(requestPocObject);
                });

                procObj.client_unit_id = $scope.createPossibility.client_id;
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
                procObj.user_id = $scope.createPossibility.point_of_contacts[0].user_id;
                console.log(procObj);
                $scope.myPromise = suspectService.suspectUpdate(procObj).then(function (response) {
                    CoreService.toastSuccess('','SUSPECT Updated Successfully.');
                    $state.go('app.suspect-view');
                });
                console.log($scope.point_of_contacts);
                console.log($scope.support_array);
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
  }]);
