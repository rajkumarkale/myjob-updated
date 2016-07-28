/**
 * Created by revathi bandi on 5/11/2016.
 */
var app = angular.module('com.module.empanelment')
    .controller('empanelmentController', ['$scope', '$state', 'appConfig', '$stateParams', 'pricingModel', 'SLATrackerModel','Upload', function ($scope, $state, appConfig, $stateParams, pricingModel, SLATrackerModel,Upload) {
        $scope.pricingModel = new pricingModel({});
        $scope.init = function ($stateParams) {
            $scope.pricingMode = appConfig.empanelment.pricingMode;
            $scope.creditTerm = appConfig.empanelment.creditTerm;
            $scope.OB = appConfig.empanelment.OB;
            $scope.status = appConfig.suspect.status;
            $scope.prospectStatus = appConfig.prospect.status;

        };
        $scope.init();
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
          var obj = {};
          var obj1 = {};
          obj.url = $scope.uploadFiles[0].url;
          obj.type = $scope.uploadFiles[0].documentType;
          $scope.saleObject.documents.push(obj);

          /*obj1.url = $scope.uploadFile[0].url;
          obj1.type = $scope.uploadFile[0].documentType;
          $scope.saleObject.documents.push(obj1);
            $scope.saleObject.pricing=$scope.pricing;*/

            $scope.savePromise= $scope.saleObject.update().then(function(){
                   $state.go('app.viewEmpanelment');
                 });
        };

      //watch on file upload pan
      $scope.uploadFiles=[];
      $scope.$watch('files', function() {
        $scope.upload($scope.files);
      });
      $scope.uploadPromise;
      $scope.upload = function(files) {
        $scope.fileNameLen = files[0].name.length-3;
        $scope.fileFormat = files[0].name.substring($scope.fileNameLen);
        if($scope.fileFormat=='pdf' || $scope.fileFormat=='jpg' || $scope.fileFormat=='epg') {
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
                }, null, function (evt) {
                });
              }
            }
          }
        }

        else{
          CoreService.alertInfo('ERROR', 'Supported file formats are Docs & JPEG');
          document.getElementById("inputText").value = "";
        }
      };


      //watch on file upload agreement
  /*    $scope.uploadFile=[];
      $scope.$watch('file1', function() {
        $scope.uploads($scope.file1);
      });
      $scope.uploadsPromise;
      $scope.uploads = function(file1) {
        $scope.fileNameLen1 = file1[0].name.length-3;
        $scope.fileFormat1 = file1[0].name.substring($scope.fileNameLen1);
        if($scope.fileFormat1=='pdf' || $scope.fileFormat1=='jpg' || $scope.fileFormat1=='epg') {
          if (file1 && file1.length) {

              var _file = file1[0];
              if (!_file.$error) {
                $scope.uploadsPromise = Upload.uploads({
                  url: appConfig.apiUrl + '/api/upload/file',
                  data: {
                    content: _file
                  }
                }).then(function (resp) {
                  _file.url = resp.data.url;
                  _file.documentType = angular.copy(appConfig.possibility.documentType);
                  $scope.uploadFile.push(_file);
                }, null, function (evt) {
                });
              }
            }

        }

        else{
          CoreService.alertInfo('ERROR', 'Supported file formats are Docs & JPEG');
          document.getElementById("inputText2").value = "";
        }
      };*/
  }]);
