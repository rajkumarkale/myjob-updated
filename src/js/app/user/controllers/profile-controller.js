/**
 * @ngdoc function
 * @name com.module.users.controller:LoginCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $routeParams
 * @requires $location
 * Contrller for Login Page
 **/
angular.module('com.module.user')
  .controller('profileController', ['$scope','profile','countries','AuthService','$state','$modal','invoices',  function ($scope,profile,countries,AuthService,$state,$modal,invoices) {
    'use strict';
    $scope.profile = profile.data;
    $scope.invoices = invoices.data;
    $scope.countries = countries.data;
    $scope.selectedCountry = _.find(countries.data,function (country){return country.id === profile.data.country});
    $scope.diskSpaceProgress = $scope.profile.diskSpaceUse / $scope.profile.diskSpace * 100;
    $scope.updateProfile = function (){
      AuthService.updateProfile($scope.profile)
        .success(function (){
          $scope.common.toastSuccess('Success','Profile updated successfully.');
        })
        .error(function (err){
          $scope.common.toastWarning('Fail','Profile updating failed.');
      });
    }

    $scope.openModel = function () {
      var modalInstance;
      $scope.source = ($scope.source)?$scope.source:'';
      modalInstance = $modal.open({
        templateUrl: 'js/app/pricing/views/pricing.html',
        controller:'pricingController',
        size:'lg',
        resolve: {
          packages: function (pricePlansService) {
            return pricePlansService.getPricingPlans();
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.source=selectedItem.name;
        $scope.onSelectEvent({item:$scope.source});
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    }

    $scope.openInvoices = function () {
      var modalInstance;
      $scope.source = ($scope.source)?$scope.source:'';
      modalInstance = $modal.open({
        templateUrl: 'js/app/user/views/invoices.html',
        controller:'invoicesController',
        size:'lg',
        resolve:{
          invoices: ['AuthService', function (AuthService){
            return  AuthService.getInvoices();
          }]
        }

      });

    }


  }]);
