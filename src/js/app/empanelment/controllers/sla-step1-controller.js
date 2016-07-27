/**
 * Created by kveena on 7/18/2016.
 */
angular.module('com.module.empanelment')
    .controller('sla-step1-controller', ['$scope', '$state', 'appConfig', '$rootScope', '$stateParams', function ($scope, $state, appConfig, $rootScope, $stateParams) {
        /*$scope.SLATracker=new SLATrackerModel({});*/
        if ($stateParams.empanelment) {
            console.log($stateParams.empanelment);
            console.log($stateParams.SLATracker);
        }
        $scope.saleObject = $stateParams.empanelment;
        $scope.SLATracker = $stateParams.SLATracker;
        
        $scope.toSLATrackerStep2 = function () {
            $state.go('app.slaTracker-step2', {
                empanelment: $scope.saleObject,
                SLATracker: $scope.SLATracker
            })
        };

        $scope.submitSLA = function () {

            $scope.saleObject.SLATracker=$scope.SLATracker;

            $scope.savePromise= $scope.saleObject.update().then(function(){
                   $state.go('app.viewEmpanelment');
                 });
        };
        
        $scope.OB = appConfig.empanelment.OB;
        $scope.open = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openCal = opened;

            if ($scope.openCal === 'opened1') {
                $scope.opened1 = true;
                $scope.opened2 = false;
                $scope.opened3 = false;
                $scope.opened4 = false;
                $scope.opened5 = false;

            } else if ($scope.openCal === 'opened2') {
                $scope.opened2 = true;
                $scope.opened1 = false;
                $scope.opened3 = false;
                $scope.opened4 = false;
                $scope.opened5 = false;
            } else if ($scope.openCal === 'opened3') {
                $scope.opened3 = true;
                $scope.opened1 = false;
                $scope.opened2 = false;
                $scope.opened4 = false;
                $scope.opened5 = false;

            } else if ($scope.openCal === 'opened4') {
                $scope.opened4 = true;
                $scope.opened1 = false;
                $scope.opened2 = false;
                $scope.opened3 = false;
                $scope.opened5 = false;

            } else if ($scope.openCal === 'opened5') {
                $scope.opened5 = true;
                $scope.opened1 = false;
                $scope.opened2 = false;
                $scope.opened4 = false;
                $scope.opened4 = false;

            }
        };

}]);