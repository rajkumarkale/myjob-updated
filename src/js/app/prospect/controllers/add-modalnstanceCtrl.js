/**
 * Created by rkale on 5/25/2016.
 */

angular.module('com.module.prospect')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, appConfig, possibilityCreateService, discussionService,$cookies,$state,Upload,CoreService) {

        $scope.status = appConfig.discussion.typeOfDiscussion;
        $scope.data = discussionService.getData();
        $scope.userId = JSON.parse($cookies.userData).userDetails._id;
        $scope.discussion = {};

    $scope.uploadFiles=[];
            $scope.$watch('files', function() {
            $scope.upload($scope.files);
        });
            $scope.upload = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                      $scope.uploadPromise=  Upload.upload({
                            url: appConfig.apiUrl+'/api/upload/file',
                            data: {
                                content: file
                            }
                        }).then(function(resp) {
                          file.url = resp.data.url;
                          file.documentType = angular.copy(appConfig.possibility.documentType);
                          $scope.uploadFiles.push(file);

                          $scope.fileName=file.name;

                          if (file.name.length > 7 ) {
                          $scope.fileNamePart1 = file.name.substring(0, 8);
                          $scope.fileNameLen = file.name.length - 7;
                          $scope.fileNamePart2 = file.name.substring($scope.fileNameLen);
                          $scope.fileName = $scope.fileNamePart1 + '...' + $scope.fileNamePart2
                          console.log($scope.fileName+' '+file.name);
                        }
                        }, null, function(evt) {

                        });
                    }
                }
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
                type:$scope.discussion.calltype
        };

         $scope.discussionPromise= possibilityCreateService.createDiscussion(reqData).success(function (response) {
                CoreService.toastSuccess('Disscussions?', 'Created Discussion successfully.');
                //console.log(response);
                $modalInstance.close(response);

            }).error(function (err) {
                $scope.authError = err.message;
                toaster.pop('Fail', 'Failed to Create Client.');
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
