/**
 * Created by rkale on 5/20/2016.
 */
angular.module('com.module.prospect')
.controller('viewDiscussionCtrl',['$scope','$modal',function($scope,$modal){
  console.log('sample');
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

