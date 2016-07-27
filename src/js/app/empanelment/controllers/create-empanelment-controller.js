/**
 * Created by revathi bandi on 5/11/2016.
 */
var app = angular.module('com.module.empanelment')
    .controller('empanelmentController', ['$scope', '$state', 'appConfig', '$stateParams', 'pricingModel', 'SLATrackerModel', function ($scope, $state, appConfig, $stateParams, pricingModel, SLATrackerModel) {
        $scope.pricingModel = new pricingModel({});
        $scope.init = function ($stateParams) {
            $scope.pricingMode = appConfig.empanelment.pricingMode;
            $scope.creditTerm = appConfig.empanelment.creditTerm;
            $scope.OB = appConfig.empanelment.OB;
            $scope.status = appConfig.suspect.status;
            $scope.prospectStatus = appConfig.prospect.status;
        };
        $scope.init();
        if ($stateParams.empanelment) {
            $scope.saleObject = $stateParams.empanelment;
        }
        $scope.open = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened1 = !$scope.opened1;
        };
        $scope.opendate = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened2 = !$scope.opened2;
        };

        //sla tracker
        if ($scope.saleObject.SLATracker) {
            $scope.SLATracker = $scope.saleObject.SLATracker;
        } else {
            $scope.SLATracker = new SLATrackerModel({});
        }

        $scope.toSLATrackerStep1 = function () {
            $state.go('app.slaTracker', {
                empanelment: $scope.saleObject,
                SLATracker: $scope.SLATracker
            })
        }
        $scope.isSLATrackerFilled = function () {
            return $scope.saleObject.SLATracker ? true : false;
        };

        //pricing
        $scope.pricing = new pricingModel({});
        $scope.submitEmpanelment = function () {



            /*$scope.savePromise= $scope.saleObject.update().then(function(){
                   $state.go('app.viewEmpanelment');
                 });*/
        };
  }]);