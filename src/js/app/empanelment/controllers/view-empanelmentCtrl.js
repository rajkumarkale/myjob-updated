/**
 * Created by rkale on 5/27/2016.
 */
angular.module('com.module.empanelment')

.controller('viewEmpanelmentCtrl', ['$scope', 'discussionService', '$state', 'saleModuleService', '$filter', function ($scope, discussionService, $state, saleModuleService, $filter) {
    $scope.data = {};
    $scope.empanelmentCsvdata = [];
    $scope.getArray = function () {
        return $scope.empanelmentCsvdata;
    };

    $scope.getCSVHeader = function () {
        var headerArr = ["LegalEntity", "BusinessUnit", "Commercial Model", "Agreement Start Date", "Agreement Tenure", "Business Vertical"];
        return headerArr;
    };
    $scope.openDiscussions = function (empanelment, status) {
        discussionService.setData(empanelment);
        $state.go('app.viewDiscussions', {
            status: status
        });
    };
    $scope.filteredRows = [];
    $scope.sortType = 'client.legalName';
    $scope.sortReverse = false;
    $scope.open = function ($event, opened) {
        $event.preventDefault();
        $event.stopPropagation();

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
        }
    };
    saleModuleService.getDashboardData().then(function (response) {
        var data = response.data;
        console.log(data.empanelment.count);
        $scope.data.count = data.empanelment.count ? data.empanelment.count : 0;

    });
    $scope.getEmpanelments = function (currentPage, numPerPage) {
        $scope.myPromise = saleModuleService.getSalesData({
            stage: 'EMPANELMENT'
        }).then(function (response) {
            console.log("possible", response);
            $scope.data.empnelments = response;
            for (var i = 0; i <= $scope.data.empnelments.length; i++) {
                var excelData = {
                    "LegalEntity": $scope.data.empnelments[i].client.legalName,
                    "Business_Unit": $scope.data.empnelments[i].client.businessUnit,
                    "commercial_model": $scope.data.empnelments[i].pricing ? $scope.data.empnelments[i].pricing.mode : '--',
                    "Agreement_stratDate": $scope.data.empnelments[i].SLATracker ? $filter('date')($scope.data.empnelments[i].SLATracker.agreementAndImportantDates.agreementStartDate, 'dd/MM/yyyy') : '--',
                    "Agreement_Tenure": $scope.data.empnelments[i].SLATracker ?$filter('date')($scope.data.empnelments[i].SLATracker.agreementAndImportantDates.agreementEndDate, 'dd/MM/yyyy') : '--',
                    "Business_Vertical": $scope.data.empnelments[i].client.vertical
                };
                $scope.empanelmentCsvdata.push(excelData);

            }
        });

    };
    $scope.getEmpanelments($scope.data.currentPage, $scope.data.numPerPage);
    $scope.openEditEmpanelment = function (empanelment) {
        console.log(empanelment);
        $state.go('app.createEmpanelment', {
            empanelment: empanelment
        });
    };

    $scope.sumStartDate = new Date();
    $scope.sumEndDate;
    $scope.getEmpanelmentsByRange = function (currentPage, numPerPage) {
        var st = $filter('date')($scope.start, 'MM/dd/yyyy');
        var date1 = new Date(st).getTime();
        var ed = $filter('date')($scope.end, 'MM/dd/yyyy');
        var date2 = new Date(ed).getTime();
        if (date1 < date2) {
            $scope.sumStartDate = $scope.start;
            $scope.sumEndDate = $filter('date')($scope.end, 'to MMMM yyyy');
            $scope.myPromise = saleModuleService.getSalesData({
                stage: 'EMPANELMENT',
                start: date1,
                end: date2
            }).then(function (response) {
                console.log("possible", response);
                $scope.data.empnelments = response;
            });
        } else {
            CoreService.toastError('', 'Satrt date should be less than End date.');
        }
    }

    }]);