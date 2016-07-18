angular.module('com.module.prospect')
.controller('viewDiscussionCtrl',['$scope','possibilityCreateService','discussionService','$cookies','$modal',function($scope,possibilityCreateService,discussionService,$cookies,$modal){
    $scope.data=discussionService.getData();
    $scope.userId=JSON.parse($cookies.userData).userDetails._id;
    $scope.sortType='time_of_discussion';
    $scope.reverse=true;
    $scope.discussions=$scope.data.discussions;
    /*var queryParameters = {client_unit_id:$scope.data.client_unit_id , client_status_id: $scope.data.client_status, count: 1, page:10, discussed_by:$scope.userId };
    $scope.getDiscussionPromise =possibilityCreateService.getDiscussions(queryParameters).then(function(response){
        $scope.discussions=response.data;
        console.log(response.data);
    });*/
    $scope.download=function(url){
        var filename = url.substring(url.lastIndexOf('/')+1);
        console.log(filename);
        window.open(url);
    }
    $scope.openAddDiscussions = function () {
    var modalInstance = $modal.open({
      templateUrl: 'js/app/prospect/views/add-new-discussions.html',
      backdrop: 'static',
      controller: 'ModalInstanceCtrl',
      size: 'lg'
    });
    modalInstance.result.then(function (data) {
      $scope.discussions.push(data);
    });
  };
    }]);
