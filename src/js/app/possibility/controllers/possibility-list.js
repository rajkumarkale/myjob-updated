angular.module('com.module.possibility')
    .controller('possibilityListController', ['$scope', '$state', 'toaster', '$timeout', '$cookies', 'discussionService', 'CoreService', '$filter', '$rootScope', 'saleModuleService','SaleModel', function ($scope, $state, toaster, $timeout, $cookies, discussionService, CoreService, $filter, $rootScope, saleModuleService,SaleModel) {
        $scope.selectedItem = [];
        $scope.filteredRows = [];
      $scope.clinetname=[];
        $scope.sortType = 'legal_name';
        $scope.sortReverse = false;
      $scope.possibilityCsvdata =[];
       $scope.getArray =function(){
         return $scope.possibilityCsvdata;
       };

      $scope.getCSVHeader = function () {
        var headerArr = ["LegalEntity","BusinessUnit","Location","ContactPerson","ContactDesignation","ContactNumber"];
        return headerArr;
      };

        $scope.data = {
            numPerPage: 10,
            searchKeywords: '',
            row: '',
            currentPage: 1
        };
        saleModuleService.getDashboardData().then(function (response) {
            console.log(response.data);
            var data = response.data;
            $scope.data.met = data.possibility.met ? data.possibility.met : 0;
            $scope.data.notMet = data.possibility.notMet ? data.possibility.notMet : 0;
            $scope.data.inactive = data.possibility.inActive ? data.possibility.inActive : 0;
        });
        $scope.getPossibilities = function (currentPage, numPerPage) {
            $scope.myPromise = saleModuleService.getSalesData().then(function (response) {
                console.log("possible", response);
                $scope.data.possibilities = response;
if($scope.data.possibilities[i]) {
  for (var i = 0; i <= $scope.data.possibilities.length; i++) {
    var excelData = {
      "LegalEntity": $scope.data.possibilities[i].client.legalName,
      "Business_Unit": $scope.data.possibilities[i].client.businessUnit,
      "Location": $scope.data.possibilities[i].client.address.city,
      "contactPerson": $scope.data.possibilities[i].pointOfContacts[0].name,
      "contactDesignation": $scope.data.possibilities[i].pointOfContacts[0].designation,
      "contactNumber": $scope.data.possibilities[i].pointOfContacts[0].phone
    };
    $scope.possibilityCsvdata.push(excelData);

  }
}


            });

        };
      /*$scope.clinetname.push(SaleModel.possibility.getPrimaryContact().name);*/
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
                $scope.myPromise = saleModuleService.getSalesData({
                    start: date1,
                    end: date2
                }).then(function (response) {
                    console.log("possible", response);
                    $scope.data.possibilities = response;
                });
            } else {
                CoreService.toastError('', 'Satrt date should be less than end date.');
            }
        };
        $scope.getPossibilities($scope.data.currentPage, $scope.data.numPerPage);

        $scope.deletePossibility = function (saleObject) {
            saleObject.possibility = 'INACTIVE';
            $scope.myPromise = saleObject.update();
        };
        $scope.openEditPossibility = function (possibility) {
            console.log(possibility);
            $state.go('app.createPossibility', {
                possibility: possibility
            });
        };
        $scope.openDiscussions = function (possibility,status) {
            discussionService.setData(possibility);
            $state.go('app.viewDiscussions',{status:status});
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
