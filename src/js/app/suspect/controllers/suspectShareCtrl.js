/**
 * Created by rkale on 6/28/2016.
 */
angular.module('com.module.suspect')
  .controller('suspectShareCtrl',function ($scope,$modalInstance,$http,clinetId,$cookies,suspectService) {
    $scope.data = '';
    $scope.uId = '';
    $scope.userId = JSON.parse($cookies.userData).userDetails._id;
    $scope.getNames = function (val) {
            return $http({
                    method: 'GET',
                    url: 'http://myjobs-node-server-dev.herokuapp.com' + '/api/users?name=' + val
                }).then(function (response) {
                    return response.data.users;
                });
    };
    $scope.setTransferdata = function ($item, $model, $label, $event, $index) {
        $scope.uId=$item._id;

    };
    $scope.setShareData = function ($item, $model, $label, $event, $index) {

        $scope.uId=$item._id;
    };

  $scope.transfer=function () {
      suspectService.transfer(clinetId,$scope.uId).then(function(response){
          console.log(response);
          $modalInstance.close(response);
      });
    };
    $scope.prev={
        name:'edit'
    };
    $scope.share=function () {
        if($scope.prev.name==='edit'){
        $scope.privilage='edit';
    }else{
        $scope.privilage='view';
    }
        $scope.data={access_type :$scope.privilage,userIds:[{userId:$scope.uId}]}
      suspectService.share($scope.data,clinetId).then(function(response){
          console.log(response);
          $modalInstance.close(response);
      });
    };
    $scope.cancel=function () {
      $modalInstance.dismiss();
    }

  });
