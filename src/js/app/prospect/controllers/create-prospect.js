angular.module('com.module.prospect')
    .controller('prospectCreateController', ['$scope', '$state', 'appConfig', '$modal', '$stateParams', '$filter', 'RequirementModel', 'saleModuleService','$timeout', function ($scope, $state, appConfig, $modal, $stateParams, $filter, RequirementModel, saleModuleService,$timeout) {
        $scope.values = appConfig.prospect.typeOfBusiness;
        $scope.prospectStatus = appConfig.prospect.status;
        $scope.suspectStatus = appConfig.suspect.status;
        $scope.turnover = appConfig.possibility.groupTurnover;
        $scope.priority = appConfig.prospect.priority;
        $scope.requireStatus = appConfig.requirementKeys.requirementType;
        $scope.industry = appConfig.requirementKeys.industry;
        $scope.primaryLevel = appConfig.requirementKeys.primaryLevel;
        $scope.showAddReq = false;
        $scope.lostDisable=false;
        $scope.blurLost=false;
        if ($stateParams.prospect) {
            $scope.saleObject = $stateParams.prospect;
            var date = $filter('date')($scope.saleObject.estimatedClosure, 'MM/dd/yyyy');
            $scope.closureDate=date;
            if($scope.saleObject.client.clientName){
                $timeout(function () {
                    $("#clientName").removeClass('is-empty');
                }, 10);
            }
            if($scope.saleObject.client.potentialNumbers){
                $timeout(function () {
                    $("#potentialNumbers").removeClass('is-empty');
                }, 10);
            }
            if($scope.saleObject.client.revenue){
                $timeout(function () {
                    $("#revenue").removeClass('is-empty');
                }, 10);
            }
            if($scope.saleObject.minimumRequirements){
                $timeout(function () {
                    $("#minimumRequirements").removeClass('is-empty');
                }, 10);
            }

        }
        $scope.cancel = function () {
            $state.go('app.viewProspect');
        };
        $scope.closureDate='';
        $scope.requirement = new RequirementModel({});
        $scope.submit = function () {
            if($scope.saleObject.prospect==='AGREEMENT_ON_CLOSURE'){
            var timestamp = $scope.closureDate.getTime();
            $scope.saleObject.estimatedClosure = timestamp;
                }
            $scope.myPromise = $scope.saleObject.update().then(function () {
                $state.go('app.viewProspect');
            });
        };

        $scope.submitAOC=function(){
            $scope.myPromise=$scope.saleObject.update().then(function (response) {
                console.log(response);
                $state.go('app.viewProspect');
            });
        };
        $scope.submitRequirement = function () {
            $scope.openReq('false');
            console.log($scope.requirement);
            $scope.myPromise=saleModuleService.addRequirement($scope.saleObject._id, $scope.requirement).then(function (response) {
                console.log(response.data);
                $scope.requirements.push(response.data);
              $scope.requirement={};
              $scope.values.selectedItem = '';
              $scope.prospectStatus .selectedItem = '';
              $scope.suspectStatus.selectedItem = '';
              $scope.priority .selectedItem = '';
              $scope.requireStatus .selectedItem = '';
              $scope.industry.selectedItem = '';
              $scope.primaryLevel.selectedItem = '';
            });

        };
        $scope.getRequirement = function () {
            $scope.myPromise=saleModuleService.getRequirements($scope.saleObject._id).then(function (response) {
                console.log(response.data);
                $scope.requirements = response.data;

            });
        };
        $scope.getRequirement();

        $scope.sumStartDate = new Date();
        $scope.sumEndDate;
        $scope.getRequiremetsByRange = function () {
            var st = $filter('date')($scope.start, 'MM/dd/yyyy');
            var date1 = new Date(st).getTime();
            var ed = $filter('date')($scope.end, 'MM/dd/yyyy');
            var date2 = new Date(ed).getTime();
            if (date1 < date2) {
                $scope.sumStartDate = $scope.start;
                $scope.sumEndDate = $filter('date')($scope.end, 'to MMMM yyyy');
                $scope.myPromise = saleModuleService.getRequirements($scope.saleObject._id, date1, date2).then(function (response) {
                    console.log(response.data);
                    $scope.requirements = response.data;
                });
            } else {
                CoreService.toastError('', 'Satrt date should be less than End date.');
            }
        };
        $scope.open = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openCal = opened;

            if ($scope.openCal === 'opened1') {
                $scope.opened1 = true;
                $scope.opened2 = false;
                $scope.opened3 = false;
            } else if ($scope.openCal === 'opened2') {
                $scope.opened2 = true;
                $scope.opened1 = false;
                $scope.opened3 = false;
            } else if ($scope.openCal === 'opened3') {
                $scope.opened2 = false;
                $scope.opened1 = false;
                $scope.opened3 = true;
            }
        };
        $scope.ageData = {
            data: []
        };
        for (var i = 19; i < 71; i++) {
            $scope.ageData.data.push({
                key: i,
                displayText: i
            })
        }
        $scope.Experience = {
            data: []
        };
        for (var i = 0; i < 45; i++) {
            $scope.Experience.data.push({
                key: i,
                displayText: i
            })
        }
        $scope.CTC = {
            data: []
        };
        for (var i = 0; i < 45; i++) {
            $scope.CTC.data.push({
                key: i,
                displayText: i
            })
        }
        $scope.functional_area = {
            data: []
        };
        $scope.functional_area.data.push({
            key: 'Accounting',
            displayText: 'Accounting / Tax / Company Secretary / Audit'
        }, {
            key: 'Accounts',
            displayText: 'Accounts'
        }, {
            key: 'Agent',
            displayText: 'Agent'
        }, {
            key: 'Airline / Reservations / Ticketing / Travel',
            displayText: 'Airline / Reservations / Ticketing / Travel'
        }, {
            key: ' Analytics &amp; Business Intelligence',
            displayText: ' Analytics &amp; Business Intelligence'
        }, {
            key: '  Anchoring / TV / Films / Production',
            displayText: '  Anchoring / TV / Films / Production'
        }, {
            key: 'Any',
            displayText: 'Any'
        }, {
            key: ' Any Other',
            displayText: ' Any Other'
        }, {
            key: 'Architects / Interior Design / Naval Arch.',
            displayText: 'Architects / Interior Design / Naval Arch.'
        }, {
            key: 'Art Director / Graphic / Web Designer',
            displayText: 'Art Director / Graphic / Web Designer'
        }, {
            key: ' Banking / Insurance',
            displayText: ' Banking / Insurance'
        }, {
            key: 'Banking, Insurance &amp; Financial Services',
            displayText: 'Banking, Insurance &amp; Financial Services'
        }, {
            key: 'Construction',
            displayText: 'Construction'
        }, {
            key: 'Content / Editors / Journalists',
            displayText: 'Content / Editors / Journalists'
        }, {
            key: 'Corporate Planning / Consulting / Strategy',
            displayText: 'Corporate Planning / Consulting / Strategy'
        }, {
            key: 'Engineering Design / R&amp',
            displayText: 'Engineering Design / R&amp'
        }, {
            key: 'Entrepreneur / Businessman / Outside Management Consultant',
            displayText: 'Entrepreneur / Businessman / Outside Management Consultant'
        }, {
            key: ' Export / Import',
            displayText: ' Export / Import'
        }, {
            key: 'Export / Import / Merchandising ',
            displayText: 'Export / Import / Merchandising '
        }, {
            key: 'Fashion',
            displayText: 'Fashion'
        }, {
            key: 'Fashion / Garments / Merchandising',
            displayText: 'Fashion / Garments / Merchandising'
        }, {
            key: 'Finance &amp; Accounts',
            displayText: 'Finance &amp; Accounts'
        }, {
            key: 'Front Office Staff / Secretarial / Computer Operator',
            displayText: 'Front Office Staff / Secretarial / Computer Operator'
        }, {
            key: 'Guards / Security Services',
            displayText: 'Guards / Security Services'
        }, {
            key: 'Hotels / Restaurant Management',
            displayText: 'Hotels / Restaurant Management'
        }, {
            key: 'HR / Admin / PM / IR / Training',
            displayText: 'HR / Admin / PM / IR / Training'
        }, {
            key: 'Human Resources ',
            displayText: 'Human Resources '
        }, {
            key: 'IT- Hardware / Telecom / Technical Staff',
            displayText: 'IT- Hardware / Telecom / Technical Staff'
        }, {
            key: ' IT Software - Application Programming / Maintenance',
            displayText: ' IT Software - Application Programming / Maintenance'
        }, {
            key: ' IT Software - Client Server',
            displayText: 'IT Software - Client Server'
        }, {
            key: ' IT Software - Mainframe',
            displayText: ' IT Software - Mainframe'
        });

        $scope.openReq = function (val) {
            if (val === 'true')
                $scope.showAddReq = true;


            else {
                $scope.showAddReq = false;
            }
        };
      $scope.$watch('$stateParams.prospect.prospect',function(k,v){
        if(k==='LOST' || k==='WON'){
          $scope.blurLost=true;
        }
      });
  }]);
