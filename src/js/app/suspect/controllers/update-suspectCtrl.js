/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.suspect')
    .controller('updateSuspectCtrl', ['$scope', 'appConfig', '$modal', '$stateParams','$http', '$state', 'Upload', '$q', 'CoreService', '$cookies', '$timeout','PointOfContactModel','saleModuleService', function ($scope, appConfig, $modal, $stateParams, $http, $state, Upload, $q, CoreService, $cookies, $timeout,PointOfContactModel,saleModuleService) {
        $scope.met_status = 'MET';
        $scope.status = {
            open: true
        };
        $scope.contactOptions = [{
            key: "REMOTE",
            label: "Remote"
        }, {
            key: "LOCAL",
            label: "Local"
        }];
        $scope.suspectTitle='Contact Details';
        $scope.setdata = function ($item, $model, $label, $event, $index) {

            var x = $item.poc_details;
            if (x) {
                $("#contact" + $index + ' .is-empty').removeClass('is-empty');
            }

        };
        $scope.opening = true;

        $scope.init = function () {
            $scope.employeeSize = appConfig.possibility.employeeSize;
            $scope.groupTurnover = appConfig.possibility.groupTurnover;
            $scope.businessVertical = appConfig.possibility.businessVertical;
            $scope.customerType = appConfig.possibility.customerType;
            $scope.contactType = appConfig.suspect.contactType;
            $scope.status = appConfig.suspect.status;
            $scope.supportArea = appConfig.suspect.supportArea;

        };

        $scope.init();

        $scope.isEditable = false;
        $scope.title = "Client Information";
        $scope.createNewContactList = function () {
            var obj = new PointOfContactModel({});
                $scope.saleObject.pointOfContacts.push(obj);
        };

        if ($stateParams.suspect) {
            $scope.saleObject = $stateParams.suspect;
            $scope.saleObject.pointOfContacts.map(function (Obj, i) {
                $timeout(function () {
                    $("#contact" + i + ' .is-empty').removeClass('is-empty');
                }, 10);
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

        $scope.showRollOut = false;
        $scope.$watch('saleObject.suspect', function (n, o) {
            if (n=== 'HOT') {
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

        //Update Suspect
        $scope.submit=function () {
                var files = [];
                $scope.uploadFiles.map(function (obj) {
                    var file = {};
                    file.url = obj.url;
                    file.type = obj.documentType;
                    files.push(file);
                });
                if (files.length > 0) {
                    $scope.saleObject.documents = files;
                }
          $scope.submitPromise= $scope.saleObject.update().then(function () {
                  $state.go('app.suspect-view')

                  }
                );
        };

        $scope.removeFiles = function (index) {
            $scope.uploadFiles.splice(index, 1);
        };

        $scope.editForm = function () {
             $scope.isEditable=$scope.saleObject.stage!=='PROSPECT'? $scope.saleObject.permission!=='VIEW':false;
               if($scope.isEditable){
                   $scope.suspectTitle='Edit Contact Details';
               }
            return $scope.isEditable;
        };
        $scope.isValid = function (val) {
            var c1 = true;
            if ($scope.saleObject.pointOfContacts.length > 0) {
                for (var i = 0; i < $scope.saleObject.pointOfContacts.length; i++) {
                    if (!($scope.saleObject.pointOfContacts[i].contactType && $scope.saleObject.pointOfContacts[i].supportArea)) {
                        c1 = false;
                        break;
                    }
                }
            }
            return (val && c1);
        };
      $scope.removeContact = function (index) {
        if (index == 0) {
          CoreService.toastError('', 'Primary contact should have primary contact');
        }
        else {
            var saleId=$scope.saleObject._id;
            var pocId=$scope.saleObject.pointOfContacts[index]._id;
          if($scope.saleObject.pointOfContacts[index]){
            $scope.saleObject.pointOfContacts.splice(index, 1);
          }
          else{
            saleModuleService.deletePoc(saleId,pocId).then(function(response){
              $scope.saleObject.pointOfContacts.splice(index, 1);
            });
          }
          }
      };
      console.log($scope.saleObject);
  }]);
