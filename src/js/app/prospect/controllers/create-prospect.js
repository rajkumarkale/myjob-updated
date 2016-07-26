angular.module('com.module.prospect')
    .controller('prospectCreateController', ['$scope', '$state', 'appConfig', '$modal', '$stateParams', '$filter', function ($scope, $state, appConfig, $modal, $stateParams, $filter) {
        $scope.values = appConfig.prospect.typeOfBusiness;
        $scope.prospectStatus = appConfig.prospect.status;
        $scope.suspectStatus = appConfig.suspect.status;
        $scope.displayagreement = true;
        $scope.status_lost = false;
        $scope.requireStatus=appConfig.prospect.requireStatus;
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

  }]);
