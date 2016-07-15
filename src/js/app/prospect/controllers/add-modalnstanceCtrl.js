/**
 * Created by rkale on 5/25/2016.
 */

angular.module('com.module.prospect')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, appConfig, possibilityCreateService, discussionService,$cookies,$state,Upload,CoreService,$filter,toaster) {

        $scope.status = appConfig.discussion.typeOfDiscussion;
        $scope.data = discussionService.getData();
        $scope.userId = JSON.parse($cookies.userData).userDetails._id;
        $scope.discussion = {};

    $scope.uploadFiles=[];
            $scope.$watch('files', function() {
            $scope.upload($scope.files);
        });
            $scope.upload = function(files) {
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
                CoreService.alertInfo('ERROR', 'please select supported file format only eg: pdf,docx,pptx');

                document.getElementById("inputText").value = "";
              }
        };

        $scope.ok = function (discussion) {
            console.log(discussion);
            var reqData = {
            text: $scope.discussion.summary,
            mode: $scope.status.selectedItem.key,
            client_unit_id: $scope.data.client_unit_id,
            client_status_id: $scope.data.client_status,
            discussed_by: $scope.userId,
                venue:$scope.discussion.venue,
                contact_person:discussion.name,
                type:'FOLLOW_UP'

        };
            var time = $filter('date')($scope.discussion.time, 'HH:mm:ss');
                var date = $filter('date')($scope.discussion.date, 'MM/dd/yyyy');
                var dtstring = date + ' ' + time;
                var timestamp = Math.round(new Date(dtstring).getTime() / 1000);
            reqData.time_of_discussion=timestamp;
            if($scope.uploadFiles.length>0){
                reqData.documents=[$scope.uploadFiles[0].url];

            }
         $scope.discussionPromise= possibilityCreateService.createDiscussion(reqData).success(function (response) {
                /*CoreService.toastSuccess('Disscussions?', 'Created Discussion successfully.');*/
                //console.log(response);
                $modalInstance.close(response);

            }).error(function (err) {
                $scope.authError = err.message;
             $modalInstance.dismiss();
                /*CoreService.toastSuccess('Fail?', 'Failed to Create Discussions.');*/
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
