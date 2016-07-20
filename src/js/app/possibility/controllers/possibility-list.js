angular.module('com.module.possibility')
    .controller('possibilityListController', ['$scope', '$state', 'toaster', '$timeout','$cookies', 'discussionService', 'CoreService', '$filter', '$rootScope', 'saleModuleService',function ($scope, $state, toaster, $timeout, $cookies, discussionService, CoreService, $filter, $rootScope,saleModuleService) {
        $scope.selectedItem = [];
        $scope.filteredRows = [];
        $scope.sortType = 'legal_name';
        $scope.sortReverse = false;
        $scope.setSelectedClient = function (item) {
            if (_.contains($scope.selectedItem, item)) {
                $scope.selectedItem = _.without($scope.selectedItem, item);
            } else {
                $scope.selectedItem.push(item);
            }
            return false;
        };

        $scope.isChecked = function (item) {
            if (_.contains($scope.selectedItem, item)) {
                return 'glyphicon glyphicon-ok pull-right';
            }
            return false;
        };
        $scope.selectAll = function () {
            for (var i = 0; i < $scope.filteredRows.length; i++) {
                if ($scope.filteredRows[i].status !== 'MET') {
                    $scope.filteredRows[i].isChecked = $scope.selectAllItems;
                }
            }
            $scope.select();
        };
        $scope.selectEntity = function () {
            $scope.select();
            for (var i = 0; i < $scope.filteredRows.length; i++) {
                if (!$scope.filteredRows[i].isChecked) {
                    $scope.selectAllItems = false;
                    return;
                }
            }
            $scope.selectAllItems = true;
        };
        $scope.select = function () {
            for (var i = 0; i < $scope.filteredRows.length; i++) {
                if ($scope.filteredRows[i].isChecked) {
                    $scope.isShow = true;
                    return;
                }
                $scope.isShow = false;
            }

        };
        $scope.showAllCheckBox = function () {
            var check = false;
            if ($scope.filteredRows) {
                for (var i = 0; i < $scope.filteredRows.length; i++) {
                    if ($scope.filteredRows[i].status !== 'MET') {
                        check = true;
                    }
                }
            }
            return check;
        };
        $scope.data = {
            numPerPage: 10,
            searchKeywords: '',
            row: '',
            currentPage: 1
        };
        $scope.getPossibilities = function (currentPage, numPerPage) {
            $scope.myPromise = saleModuleService.getSalesData().then(function (response) {
                console.log("possible", response);
                $scope.data.possibilities = response;
                /*$scope.data.totalItems = response.length;
                $scope.data.met = possibilityCreateServices.getStatusCount(response, 'possibility', 'MET');
                $scope.data.notMet = possibilityCreateServices.getStatusCount(response, 'possibility', 'NOT_MET');
                $scope.data.inactive = possibilityCreateServices.getStatusCount(response, 'possibility', 'INACTIVE');*/
            });
            
        };
        $scope.sumStartDate = new Date();
        $scope.sumEndDate;
        $scope.getPossibilityByRange = function (currentPage, numPerPage) {

            var st = $filter('date')($scope.start, 'MM/dd/yyyy');
            var date1 = new Date(st).getTime();
            var ed = $filter('date')($scope.end, 'MM/dd/yyyy');
            var date2 = new Date(ed).getTime();
            if (date1 < date2) {
                $scope.sumStartDate = $scope.start;
                $scope.sumEndDate = $filter('date')($scope.end, 'to MMMM yyyy');
                $scope.myPromise = saleModuleService.getSalesDataByRange(currentPage, numPerPage, date1, date2).then(function (response) {
                    console.log("possible", response);
                $scope.data.possibilities = response;
                });
            } else {
                CoreService.toastError('', 'Satrt date should be less than end date.');
            }
        };
        $scope.getPossibilities($scope.data.currentPage, $scope.data.numPerPage);
        $scope.deletePossibility = function () {
            var ids = [];
            var id = {
                clientUnitIds: ids
            };

            for (var i = 0; i < $scope.filteredRows.length; i++) {
                if ($scope.filteredRows[i].isChecked) {
                    ids.push({
                        "clientUnitId": $scope.filteredRows[i].client_unit_id
                    });
                }
            }

            $scope.myPromise = possibilityCreateService.deletePossibilities(id).then(function (response) {
                console.log(response);
                $state.reload('app.viewPossibility');
            });
        };
        $scope.openEditPossibility = function (possibility) {
            console.log(possibility);
            $state.go('app.createPossibility', {
                possibility: possibility
            });
        };
        $scope.openDiscussions = function (possibility) {
            discussionService.setData(possibility);
            $state.go('app.viewDiscussions');
        };
        $scope.statusColor = function (status) {
            switch (status) {
            case "MET":
                return 'status-met';
                break;
            case "NOT_MET":
                return 'status-notmet';
                break;
            case "INACTIVE":
                return 'status-inactive';
                break;
            default:
            }
        };

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

  }]);
