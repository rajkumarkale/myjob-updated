
angular.module('app').directive('browse', function () {
  'use strict';
  function uploadCtrl($scope, $http, browseFactory, toaster, $sce) {
    $scope.onUpload = function ($file) {
      $scope.uploadModel = {
        url:''
        }
      };

      var file = $file[0],
       fd = new FormData(),
       reader = new FileReader();
      fd.append('file', file);
      if ((/\.(jpg|jpeg|png)$/i).test(file.name)) {
        reader.onload = (function () {
          return function (e) {
            $scope.$apply(function () {
              $scope.uploadModel.url = e.target.result;
            });
          };
        })(file);
        reader.readAsDataURL(file);
      }

      $scope.myPromise = browseFactory.uploadTos3(fd)
        .success(function (url) {
          if ((/\.(jpg|jpeg|png)$/i).test(file.name)) {
            var img = new Image();
            reader.onload = (function () {
              return function (e) {
                $scope.$apply(function () {
                  $scope.uploadModel.url = url;
                });
              };
            })(file);
            reader.readAsDataURL(file);
          }
          toaster.pop('success', 'File Successfully Uploaded');
        }).error(function () {
          toaster.pop('error', 'Error while file upload.');
        });
    };


  return {
    restrict: 'EA',
    scope: {
      uploadModel: '=',
      myPromise: '='
    },
    controller: uploadCtrl,
    templateUrl: 'tpl/browse.html'
  };
});