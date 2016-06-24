angular.module('com.module.prospect')
.controller('viewDiscussionCtrl',['$scope','possibilityCreateService','discussionService','$cookies','$modal',function($scope,possibilityCreateService,discussionService,$cookies,$modal){
    $scope.data=discussionService.getData();
    $scope.userId=JSON.parse($cookies.userData).userDetails.roles.account.id;
   
    var queryParameters = {client_unit_id:$scope.data.client_unit_id , client_status_id: $scope.data.client_status, count: 1, page:10, disussed_by:$scope.userId };
    $scope.getDiscussionPromise =possibilityCreateService.getDiscussions(queryParameters).then(function(response){
        $scope.discussions=response.data;
        console.log(response.data);
    });
    $scope.openAddDiscussions = function () {
    var modalInstance = $modal.open({
      templateUrl: 'js/app/prospect/views/add-new-discussions.html',
      backdrop: 'static',
      controller: 'ModalInstanceCtrl',
      size: 'lg'
    });
    modalInstance.result.then(function () {
        
    });
  };
    }]);