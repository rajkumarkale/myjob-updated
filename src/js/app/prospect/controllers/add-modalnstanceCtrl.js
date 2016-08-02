/**
 * Created by rkale on 5/25/2016.
 */

angular.module('com.module.prospect')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, appConfig, possibilityCreateService, discussionService,$cookies,$state,Upload,CoreService,$filter,toaster,DiscussionModel) {

        $scope.status = appConfig.discussion.typeOfDiscussion;
        $scope.data = discussionService.getData();
        $scope.userId = JSON.parse($cookies.get('userData')).userDetails._id;
        $scope.discussion = new DiscussionModel({});
        $scope.status.selectedItem='';

      //watch on file upload
    $scope.uploadFiles=[];
            $scope.$watch('files', function() {
            $scope.upload($scope.files);
        });
            $scope.upload = function(files) {
              $scope.fileNameLen = files[0].name.length-3;
              $scope.fileFormat = files[0].name.substring($scope.fileNameLen);
              if($scope.fileFormat=='pdf' || $scope.fileFormat=='ocx' || $scope.fileFormat=='ptx' || $scope.fileFormat=='png') {
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
              }

              else{
                CoreService.toastError('ERROR', 'Supported file formats are Docs & PNG');
                document.getElementById("inputText").value = "";
              }
        };

        $scope.ok = function (discussion) {
            var time = $filter('date')($scope.time, 'HH:mm:ss');
                var date = $filter('date')($scope.date, 'MM/dd/yyyy');
                var dtstring = date + ' ' + time;
                var timestamp = new Date(dtstring).getTime();
            $scope.discussion.timeOfDiscussion=timestamp;
            if($scope.uploadFiles.length>0){
                $scope.discussion.documents=[{url:$scope.uploadFiles[0].url}];

            }
          $scope.discussionPromise= $scope.discussion.create($scope.discussion,$scope.data._id).then(function (response) {
              $modalInstance.close(response.data);
              $state.go('app.viewDiscussions');
            });

        };
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
      $scope.open = function($event,opened) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened1 = !$scope.opened1;
      };
    });
