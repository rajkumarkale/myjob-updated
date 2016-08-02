/**
 * Created by revathi bandi on 5/11/2016.
 */
var app = angular.module('com.module.empanelment')
    .controller('empanelmentController', ['$scope', '$state', 'appConfig', '$stateParams', 'pricingModel', 'SLATrackerModel', 'Upload', 'CoreService', function ($scope, $state, appConfig, $stateParams, pricingModel, SLATrackerModel, Upload, CoreService) {
        $scope.pricingModel = new pricingModel({});
        $scope.init = function ($stateParams) {
            $scope.pricingMode = appConfig.empanelment.pricingMode;
            $scope.creditTerm = appConfig.empanelment.creditTerm;
            $scope.OB = appConfig.empanelment.OB;
            $scope.status = appConfig.suspect.status;
            $scope.prospectStatus = appConfig.prospect.status;


        };
        $scope.init();
        $scope.empanelFile = $stateParams.empanelment.documents[0];
        $scope.empanelFile2 = $stateParams.empanelment.documents[1];
        if ($stateParams.empanelment) {
            $scope.saleObject = $stateParams.empanelment;
        }
        $scope.open = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened1 = !$scope.opened1;
        };
        $scope.opendate = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened2 = !$scope.opened2;
        };

        //sla tracker
        if ($scope.saleObject.SLATracker) {
            $scope.SLATracker = new SLATrackerModel($scope.saleObject.SLATracker);
        } else {
            $scope.SLATracker = new SLATrackerModel({});
        }

        $scope.toSLATrackerStep1 = function () {
            $state.go('app.slaTracker', {
                empanelment: $scope.saleObject,
                SLATracker: $scope.SLATracker
            })
        };
        $scope.isSLATrackerFilled = function () {
            return $scope.saleObject.SLATracker ? true : false;
        };

        //pricing
        if ($scope.saleObject.pricing) {
            $scope.pricing = $scope.saleObject.pricing;
        } else {
            $scope.pricing = new pricingModel({});
        }

        $scope.createEmpanelment = function () {
            if ($scope.uploadFiles && $scope.fileA) {
                var obj = {};
                var obj1 = {};
                obj.url = $scope.uploadFiles.url;
                obj.type = 'OTHERS';
                $scope.saleObject.documents.push(obj);

                obj1.url = $scope.fileA.url;
                obj1.type = 'OTHERS';
                $scope.saleObject.documents.push(obj1);
            }
            $scope.saleObject.pricing = $scope.pricing;

            $scope.myPromise = $scope.saleObject.update().then(function () {
                $state.go('app.viewEmpanelment');
            });
        };

        //watch on file upload pan
        $scope.fileB = {};
        $scope.uploadPromise;
        $scope.upload = function (fileB) {
            $scope.fileNameLenB = fileB.name.length - 3;
            $scope.fileFormatB = fileB.name.substring($scope.fileNameLenB);
            if ($scope.fileFormatB == 'pdf' || $scope.fileFormatB == 'epg' || $scope.fileFormatB == 'jpg') {
                $scope.uploadPromise = Upload.upload({
                    url: appConfig.apiUrl + '/api/upload/file',
                    data: {
                        content: fileB
                    }
                }).then(function (resp) {
                    fileB.url = resp.data.url;
                    fileB.documentType = angular.copy(appConfig.possibility.documentType);
                    $scope.uploadFiles = fileB;
                }, null, function (evt) {});

            } else {
                CoreService.toastError('ERROR', 'Supported file formats are Docs & PNG');
                document.getElementById("fileB1").value = "";
                document.getElementById("fileB2").value = "";
            }
        };

        $scope.fileA = {};
        console.log($scope.fileA);
        $scope.uploadFileA = function (fileA) {
            $scope.fileNameLenA = fileA.name.length - 3;
            $scope.fileFormatA = fileA.name.substring($scope.fileNameLenA);
            if ($scope.fileFormatA == 'pdf' || $scope.fileFormatA == 'epg' || $scope.fileFormatA == 'jpg') {
                $scope.uploadsPromise = Upload.upload({
                    url: appConfig.apiUrl + '/api/upload/file',
                    data: {
                        content: fileA
                    }
                }).then(function (resp) {
                    fileA.url = resp.data.url;
                    fileA.documentType = angular.copy(appConfig.possibility.documentType);
                    $scope.fileA = fileA;
                }, null, function (evt) {});
            } else {
                CoreService.toastError('ERROR', 'Supported file formats are Docs & PNG');
                document.getElementById("fileA1").value = "";
                document.getElementById("fileA2").value = "";
            }
        };
        $scope.download = function (url) {
            var filename = url.substring(url.lastIndexOf('/') + 1);
            console.log(filename);
            window.open(url);
        };

  }]);