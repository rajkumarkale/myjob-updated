/**
 * Created by rkale on 6/28/2016.
 */
angular.module('com.module.suspect')
  .controller('suspectShareCtrl',function ($scope,$modalInstance,$http,clinetId,$cookies,suspectService) {
    $scope.data;
    $scope.userId = JSON.parse($cookies.userData).userDetails._id;
    $scope.getNames = function (val) {
            return $http({
                    method: 'GET',
                    url: 'http://myjobs-node-server-dev.herokuapp.com' + '/api/users?name=' + val
                }).then(function (response) {
                    return response.data.users;
                });
    };
    $scope.setdata = function ($item, $model, $label, $event, $index) {
        $scope.data={email:$item.email_id,clientUnitIds:[{clientUnitId:clinetId}]}
        //console.log($scope.data);
    };
  $scope.ok=function () {
      suspectService.transfer($scope.data,$scope.userId).then(function(response){
          console.log(response);
          $modalInstance.close(response);
      });
    };
    $scope.cancel=function () {
      $modalInstance.dismiss();
    }

  });
