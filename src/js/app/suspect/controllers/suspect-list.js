angular.module('com.module.suspect')
    .controller('suspectListController', ['$scope', '$state', 'toaster', '$timeout', 'CoreService', '$modal', 'discussionService', '$filter', '$rootScope', 'saleModuleService', function ($scope, $state, toaster, $timeout, CoreService, $modal, discussionService, $filter, $rootScope, saleModuleService) {
        $scope.selectedItem = [];
        $scope.filteredRows = [];
        $scope.sortType = 'legal_name';
        $scope.sortReverse = false;
        $scope.data = {
            numPerPage: 10,
            searchKeywords: '',
            row: '',
            currentPage: 1
        };
        $scope.setSelectedClient = function (item) {
            /*var id = this.company.id;*/
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
        $scope.sortType = 'legal_name';
        $scope.sortReverse = false;
        $scope.searchView = '';
        saleModuleService.getDashboardData().then(function (response) {
            console.log(response.data);
            var data = response.data;
            $scope.data.cold = data.suspect.cold ? data.suspect.cold : 0;
            $scope.data.hot = data.suspect.hot ? data.suspect.hot : 0;
            $scope.data.warm = data.suspect.warm ? data.suspect.warm : 0;
        });
        $scope.getSuspects = function (currentPage, numPerPage) {
            $scope.myPromise = saleModuleService.getSalesData({
                stage: 'SUSPECT'
            }).then(function (response) {
                console.log("suspects", response);
                $scope.data.suspects = response;
                $scope.data.totalItems = response.length;

            });
        };
        $scope.sumStartDate = new Date();
        $scope.sumEndDate;
        $scope.getSuspectsByRange = function (currentPage, numPerPage) {
            var st = $filter('date')($scope.start, 'MM/dd/yyyy');
            var date1 = new Date(st).getTime();
            var ed = $filter('date')($scope.end, 'MM/dd/yyyy');
            var date2 = new Date(ed).getTime();
            if (date1 < date2) {
                $scope.sumStartDate = $scope.start;
                $scope.sumEndDate = $filter('date')($scope.end, 'to MMMM yyyy');
                $scope.myPromise = saleModuleService.getSalesData({
                    stage: 'SUSPECT',
                    start: date1,
                    end: date2
                }).then(function (response) {
                    console.log("suspects", response);
                $scope.data.suspects = response;
                $scope.data.totalItems = response.length;
                });
            } else {
                CoreService.toastError('', 'Satrt date should be less than end date.');
            }
        };
        $scope.getSuspects($scope.data.currentPage, $scope.data.numPerPage);
        $scope.openEditSuspect = function (suspect) {
            $state.go('app.create-suspect-view', {
                suspect: suspect
            });

        };
        $scope.openDiscussions = function (suspect,status) {
            discussionService.setData(suspect);
            $state.go('app.viewDiscussions',{status:status});
        };
        $scope.statusColor = function (status) {
            switch (status) {
            case "COLD":
                return 'status-cold';
                break;
            case "WARM":
                return 'status-warm';
                break;
            case "HOT":
                return 'status-hot';
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
        $scope.openShare = function (tpl, suspect) {
            var tpl = tpl;
            var modalInstance = $modal.open({
                templateUrl: function () {
                    return 'js/app/suspect/views/' + tpl + '.html'
                },
                backdrop: 'static',
                controller: 'suspectShareCtrl',
                size: 'sm',
                resolve: {
                    clinetId: function () {
                        return suspect._id;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                $state.reload('app.suspect-view');
            });
        };
        $scope.showShare = function (suspect) {
            var show = false;
            if (suspect.permission === 'FULL') {
                show = true;
            } else if (suspect.permission === 'EDIT') {
                show = true;
            }
            return show;
        };
        $scope.showTransfer = function (suspect) {
            var show = false;
            if (suspect.permission === 'FULL') {
                show = true;
            }
            return show;
        }

  }]);