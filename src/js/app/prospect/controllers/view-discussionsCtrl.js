/**
 * Created by rkale on 5/20/2016.
 */
angular.module('com.module.prospect')
.controller('viewDiscussionCtrl',['$scope',function($scope){
  $scope.displayPopUp=function(id,ptr){
    document.getElementById(id).style.display=ptr;

  }
    $scope.closeModal=function(id,ptr)
    {
      document.getElementById(id).style.display=ptr;
    }
}])
