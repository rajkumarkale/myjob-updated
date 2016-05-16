angular.module('com.module.possibility')
.controller('createPossibilityController',['$scope','$state','FileUploader','Upload',function($scope,$state,FileUploader,Upload){

		
          $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file]; 
        }
    });
    $scope.createClient = function(){
    var modalInstance = $modal.open({
      templateUrl: 'js/app/possibility/views/create-client.html',
      backdrop: 'static',
      controller: 'createClientModalInstanceCtrl',
      size: 'md'
    });
    modalInstance.result.then(function () {
    });
  };
    

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {
                      username: $scope.username,
                      file: file  
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        $scope.log = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.log;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                      evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + 
                     '% ' + evt.config.data.file.name + '\n' + 
                      $scope.log;
                });
              }
            }
        }
    };
  }]);
