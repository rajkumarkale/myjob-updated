/**
 * Created by rkale on 5/25/2016.
 */

angular.module('com.module.prospect')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, appConfig, possibilityCreateService, discussionService,$cookies) {
        $scope.status = appConfig.discussion.typeOfDiscussion;
        $scope.data = discussionService.getData();
        $scope.userId = JSON.parse($cookies.userData).userDetails._id;
        $scope.discussion = {};
        
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
                /*toaster.pop('Success', 'Created Client successfully.');*/
                console.log(response);
                $modalInstance.close(response);
               
            }).error(function (err) {
                $scope.authError = err.message;
                toaster.pop('Fail', 'Failed to Create Client.');
            });
        };
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    });
