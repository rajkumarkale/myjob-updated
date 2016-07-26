angular.module('com.module.prospect')
    .controller('prospectCreateController', ['$scope', '$state', 'appConfig', '$modal', '$stateParams', '$filter', function ($scope, $state, appConfig, $modal, $stateParams, $filter) {
        $scope.values = appConfig.prospect.typeOfBusiness;
        $scope.prospectStatus = appConfig.prospect.status;
        $scope.suspectStatus = appConfig.suspect.status;
        $scope.displayagreement = true;
        $scope.status_lost = false;
      $scope.priority=appConfig.prospect.priority;
      $scope.requireStatus=appConfig.requirementKeys.requirementType;
      $scope.industry=appConfig.requirementKeys.industry;
        $scope.$watch('saleObject.prospect', function (n, o) {
            if (n === 'AGREEMENT_ON_CLOSURE') {
                $scope.title = 'Agreement on Closure';
                $scope.displayagreement = true;
                $scope.status_lost = false;
            } else if (n === 'LOST') {
                $scope.status_lost = true;
                $scope.displayagreement = false;
            } else {
                $scope.displayagreement = false;
                $scope.status_lost = false;
            }
        });

        if ($stateParams.prospect) {
            $scope.saleObject = $stateParams.prospect;
        }
        $scope.cancel = function () {
            $state.go('app.viewProspect');
        };
        $scope.submit = function () {
                console.log('submit clicked');
                var timestamp = $scope.date.getTime();
                $scope.saleObject.estimatedClosure = timestamp;
                $scope.savePromise = $scope.saleObject.update().then(function () {
                    $state.go('app.viewProspect');
                });
            };
            /* $scope.openRequirement = function () {

               var modalInstance = $modal.open({

                 templateUrl: 'js/app/prospect/views/add-requirement.html',
                 backdrop: 'static',
                 controller: function ($scope,$modalInstance) {
                   $scope.titlereq='Add New Requirement';

                  $scope.ok=function () {
                    $modalInstance.close();
                  }
                   $scope.cancel=function(){
                     $modalInstance.dismiss();
                   }
                 },
                 size: 'md'
               });
               modalInstance.result.then(function (data) {
                 $scope.discussions.push(data);
               });
             };*/
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
            }
            else if ($scope.openCal === 'opened3') {
              $scope.opened2 = false;
              $scope.opened1 = false;
              $scope.opened3 = true;
            }
        };
   $scope.ageData={
        data:[]
      };
      for(var i=19;i<71;i++)
      {
        $scope.ageData.data.push({
          key:i,
          displayText:i
        })
      }
      $scope.Experience={
        data:[]
      };
      for(var i=0;i<45;i++)
      {
        $scope.Experience.data.push({
          key:i,
          displayText:i
        })
      }
      $scope.CTC={
        data:[]
      };
      for(var i=0;i<45;i++)
      {
        $scope.CTC.data.push({
          key:i,
          displayText:i
        })
      }
      $scope.functional_area={
        data:[]
      };
      $scope.functional_area.data.push({
        key:'Accounting',
        displayText:'Accounting / Tax / Company Secretary / Audit'
      },{
        key:'Accounts',
        displayText:'Accounts'
      },{
        key:'Agent',
        displayText:'Agent'
      },{
        key:'Airline / Reservations / Ticketing / Travel',
        displayText:'Airline / Reservations / Ticketing / Travel'
      },{
        key:' Analytics &amp; Business Intelligence',
        displayText:' Analytics &amp; Business Intelligence'
      },{
        key:'  Anchoring / TV / Films / Production',
        displayText:'  Anchoring / TV / Films / Production'
      },{
        key:'Any',
        displayText:'Any'
      },{
        key:' Any Other',
        displayText:' Any Other'
      },{
        key:'Architects / Interior Design / Naval Arch.',
        displayText:'Architects / Interior Design / Naval Arch.'
      },{
        key:'Art Director / Graphic / Web Designer',
        displayText:'Art Director / Graphic / Web Designer'
      },{
        key:' Banking / Insurance',
        displayText:' Banking / Insurance'
      },{
        key:'Banking, Insurance &amp; Financial Services',
        displayText:'Banking, Insurance &amp; Financial Services'
      },{
        key:'Construction',
        displayText:'Construction'
      },{
        key:'Content / Editors / Journalists',
        displayText:'Content / Editors / Journalists'
      },{
        key:'Corporate Planning / Consulting / Strategy',
        displayText:'Corporate Planning / Consulting / Strategy'
      },{
        key:'Engineering Design / R&amp',
        displayText:'Engineering Design / R&amp'
      },{
        key:'Entrepreneur / Businessman / Outside Management Consultant',
        displayText:'Entrepreneur / Businessman / Outside Management Consultant'
      },{
        key:' Export / Import',
        displayText:' Export / Import'
      },{
        key:'Export / Import / Merchandising ',
        displayText:'Export / Import / Merchandising '
      },{
        key:'Fashion',
        displayText:'Fashion'
      },{
        key:'Fashion / Garments / Merchandising',
        displayText:'Fashion / Garments / Merchandising'
      },{
        key:'Finance &amp; Accounts',
        displayText:'Finance &amp; Accounts'
      },{
        key:'Front Office Staff / Secretarial / Computer Operator',
        displayText:'Front Office Staff / Secretarial / Computer Operator'
      },{
        key:'Guards / Security Services',
        displayText:'Guards / Security Services'
      },{
        key:'Hotels / Restaurant Management',
        displayText:'Hotels / Restaurant Management'
      },{
        key:'HR / Admin / PM / IR / Training',
        displayText:'HR / Admin / PM / IR / Training'
      },{
        key:'Human Resources ',
        displayText:'Human Resources '
      },{
        key:'IT- Hardware / Telecom / Technical Staff',
        displayText:'IT- Hardware / Telecom / Technical Staff'
      },{
        key:' IT Software - Application Programming / Maintenance',
        displayText:' IT Software - Application Programming / Maintenance'
      },{
        key:' IT Software - Client Server',
        displayText:'IT Software - Client Server'
      },{
        key:' IT Software - Mainframe',
        displayText:' IT Software - Mainframe'
      })

  }]);
