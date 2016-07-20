angular.module('com.module.prospect')
.controller('prospectCreateController',['$scope','$state','appConfig','$modal',function($scope,$state,appConfig,$modal){
  $scope.values=appConfig.prospect.typeOfBusiness;
  $scope.status_prospect=appConfig.prospect.status_prospect;
  $scope.status=appConfig.suspect.status;
  $scope.displayagreement=false;
  $scope.status_lost=false;
  $scope.$watch('status_prospect.selectedItem',function(n,o){
    if(n.key==='Agreement_On_Closure'){
      $scope.title='Agreement on Closure';
      $scope.displayagreement=true;
      $scope.status_lost=false;
    }else if(n.key==='LOST'){
      $scope.status_lost=true;
      $scope.displayagreement=false;
      }
    else{
      $scope.displayagreement=false;
      $scope.status_lost=false;
    }
  }) ;
  $scope.openRequirement = function () {

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
  };
  $scope.open = function($event,opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openCal=opened;

    if($scope.openCal==='opened1')
    {
      $scope.opened1 = true;
      $scope.opened2 = false;
    }
    else if($scope.openCal==='opened2')
    {
      $scope.opened2 = true;
      $scope.opened1 = false;
    }
  };

  }]);
