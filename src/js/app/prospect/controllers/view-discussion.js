angular.module('com.module.prospect')
.controller('viewDiscussionCtrl',['$scope','possibilityCreateService','discussionService','$cookies','$modal','$stateParams','saleModuleService',function($scope,possibilityCreateService,discussionService,$cookies,$modal,$stateParams,saleModuleService){
    $scope.data=discussionService.getData();
    $scope.userId=JSON.parse($cookies.userData).userDetails._id;
    $scope.showAddButton=($stateParams.status===$scope.data.stage);
    $scope.sortType='timeOfDiscussion';
    $scope.reverse=true;
    
    saleModuleService.viewDiscussions($scope.data._id,$stateParams.status).then(function(response){
        $scope.discussions=response.data;
    });
    
    
    $scope.download=function(url){
        var filename = url.substring(url.lastIndexOf('/')+1);
        console.log(filename);
        window.open(url);
    };
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
