/**
 * Created by rkale on 5/19/2016.
 */
angular.module('com.module.prospect')
  .controller('addDiscussionCtrl', ['$scope',function ($scope) {
  $scope.diplayPopUp=function(id,ptr){
    document.getElementById(id).style.display=ptr;
    alert();
  }
    
}])


