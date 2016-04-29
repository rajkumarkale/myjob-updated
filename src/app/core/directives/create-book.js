angular.module('app').directive('createBook', ['$modal', '$window',
  function ($modal, $window) {
    'use strict';
    function createCtrl($scope, $modalInstance, createFactory, toaster, appConfig) {
      $scope.book = {
        title: '',
        author: '',
        imageData: '',
        zoom: 0,
        permission: 'PUBLIC',
        subType: 'FREE',
        tags: [],
        trailPeriod: 0,
        price: 0,
        currency: 'USD'
      };
      $scope.hascover = true;
      $scope.bookPermissions = appConfig.bookPermissions;
      $scope.bookSubType = appConfig.bookSubType;
      $scope.currencyType = appConfig.currencyType;

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.createBook = function () {
        $scope.book.image = $scope.book.ImageBoxArray.ImageName;
        $scope.book.imageData = $scope.book.ImageBoxArray.Image;
        $scope.myPromise = createFactory.createBook($scope.book).success(function (data) {
          toaster.pop('success', 'Successfully created Your Book');
          $modalInstance.close();
          $window.location = '/#/book/canvas/' + data['book_id'];
        }).error(function () {
          $scope.message = 'Unexpected Error';
          toaster.pop('error', 'Unexpected Error');
        });
      };
      $scope.resetForm = function () {
        $scope.book = {
          title: '',
          author: '',
          permission: '',
          zoom: '',
          imageData: '',
          subType: '',
          tags: []
        };
        $scope.hascover = false;
      };
    }


    return {
      restrict: 'A',
      scope: {
        createBook: '&'
      },
      link: function (scope, element) {

        element.click(function () {
          $modal.open({
            templateUrl: 'tpl/bookshelf/create-book.html',
            controller: createCtrl,
            size: 'lg'
          });

        });
      }
    };
  }
]);


