/**
 * Created by rkale on 6/28/2016.
 */
angular.module('com.module.suspect')
  .controller('suspectShareCtrl',function ($scope,$modalInstance,$http,clinetId,$cookies,saleModuleService) {
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
      saleModuleService.transfer(clinetId,$scope.uId).then(function(response){
          console.log(response);
          $modalInstance.close(response);
      });
    };
    $scope.prev={
        name:'EDIT'
    };
    $scope.share=function () {
        if($scope.prev.name==='EDIT'){
        $scope.privilage='EDIT';
    }else{
        $scope.privilage='VIEW';
    }
        
       /* $scope.data={access_type :$scope.privilage,userIds:[{userId:$scope.uId}]}*/
      saleModuleService.share(clinetId,$scope.uId,$scope.privilage).then(function(response){
          console.log(response);
          $modalInstance.close(response);
      });
    };
    $scope.cancel=function () {
      $modalInstance.dismiss();
    };

  });
