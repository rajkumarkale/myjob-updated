/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.empanelment')

.controller('viewEmpanelmentCtrl', ['$scope', 'discussionService', '$state', 'saleModuleService', '$filter', function ($scope, discussionService, $state, saleModuleService, $filter) {
    $scope.data = {};
    $scope.openDiscussions = function (possibility) {
        discussionService.setData(possibility);
        $state.go('app.viewDiscussions');
    };
    $scope.filteredRows = [];
    $scope.sortType = 'legal_name';
    $scope.sortReverse = false;
    $scope.open = function ($event, opened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.openCal = opened;

        if ($scope.openCal === 'opened1') {
            $scope.opened1 = true;
            $scope.opened2 = false;
        } else if ($scope.openCal === 'opened2') {
            $scope.opened2 = true;
            $scope.opened1 = false;
        }
    };

    saleModuleService.getDashboardData().then(function (response) {
        var data = response.data;
        console.log(data.empanelment.count);
        $scope.data.count = data.empanelment.count ? data.empanelment.count : 0;

    });
    $scope.getEmpanelments = function (currentPage, numPerPage) {
        $scope.myPromise = saleModuleService.getSalesData().then(function (response) {
            console.log("possible", response);
            $scope.data.possibilities = response;
        });

    };
    $scope.getEmpanelments($scope.data.currentPage, $scope.data.numPerPage);
    $scope.openEditEmpanelment = function (empanelment) {
        console.log(empanelment);
        $state.go('app.createEmpanelment', {
            empanelment: empanelment
        });
    };
    $scope.getEmpanelmentsByRange = function (currentPage, numPerPage) {

        var st = $filter('date')($scope.start, 'MM/dd/yyyy');
        var date1 = new Date(st).getTime();
        var ed = $filter('date')($scope.end, 'MM/dd/yyyy');
        var date2 = new Date(ed).getTime();
        if (date1 < date2) {
            $scope.sumStartDate = $scope.start;
            $scope.sumEndDate = $filter('date')($scope.end, 'to MMMM yyyy');
            $scope.myPromise = saleModuleService.getSalesData({
                start: date1,
                end: date2
            }).then(function (response) {
                console.log("possible", response);
                $scope.data.empanelments = response;
            });
        } else {
            CoreService.toastError('', 'Satrt date should be less than End date.');
        }
    };
    }]);