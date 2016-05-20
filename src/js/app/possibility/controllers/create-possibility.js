angular.module('com.module.possibility')
.controller('createPossibilityController',['$scope','toaster','$state','FileUploader','possibilityCreateService','Upload','$modal','appConfig',function($scope,toaster,$state,FileUploader,possibilityCreateService,Upload,$modal,appConfig){

		
        $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file]; 
        }
    });
    $scope.createClient = function(){
    var modalInstance = $modal.open({
      templateUrl: 'js/app/possibility/views/create-client.html',
      backdrop: 'static',
      controller: 'createClientModalInstanceCtrl',
      size: 'lg'
    });
    modalInstance.result.then(function () {
    });
  };
$scope.employeeSize  ={title:"Employee Size of the company", data:["SMALL", "MEDIUM", "LARGE"],selectedItem:""};
$scope.groupTurnover  ={title:"Group Turnover", data:["SMALL", "MEDIUM", "LARGE"],selectedItem:""};
$scope.businessVertical  ={title:"Business Vertical", data:["IT", "GENERAL", "GOVT", "IT_STAFFING", "GENERAL_STAFFING", "GOVERNMENT_STAFFING", "PERM_SEARCH", "RPO"],selectedItem:""};
$scope.customerType  ={title:"Type of customer", data:["MNC", "PVT_LTD", "PUBLIC_LTD", "PROPRIETORSHIP"],selectedItem:""};
$scope.supportType  ={title:"Employee Size of the company", data:["REMOTE", "LOCAL", "BOTH"],selectedItem:""};
$scope.remoteLocation ={title:"Remote Location", data:["Hyderabad", "Bangalore", "Mumbai","Pune"],selectedItem:""};
$scope.localObj ={title:" Local", data:["Hyderabad", "Bangalore", "Mumbai","Pune"],selectedItem:""};

  $scope.createPossibility =  {
					client_id:"",
					legal_name:"", 
					unit_name:"",
					division :"", 
					url:"",
					employee_size:"",
					turnover:"",
					vertical:"",
					customer_type:"",
					"address": {
					address_line_1:"",
					address_line_2 :"",
					city :"",
					state  :"",
					country  :"",
					pin:""
					},
					"Current_status": {
					stage :"POSSIBILITY",
					status :"NOT_MET"
					 },
					"point_of_contacts": [
					
					{
					user_id:"",
					name:"", 
					email_id:"", 
					support_type:"", 
					support_location:"", 
					designation:"",
					phone:"",
					}
					]
}


 $scope.save = function(val){
 	
 	$scope.processRequest(val);
   
  };

 
$scope.processRequest = function(requestObject){
	requestObject.employee_size = $scope.employeeSize.selectedItem;
	requestObject.turnover = $scope.groupTurnover.selectedItem;
	requestObject.vertical = $scope.businessVertical.selectedItem;
	requestObject.customer_type = $scope.customerType.selectedItem;
	requestObject.point_of_contacts[0].support_location = $scope.remoteLocation.selectedItem;
	if($scope.remote && $scope.local)
	{
		requestObject.point_of_contacts[0].support_type = 'BOTH';
	}else if($scope.remote){
		requestObject.point_of_contacts[0].support_type = 'REMOTE';
	}else{
		if(requestObject.local){
			requestObject.point_of_contacts[0].support_type = 'LOCAL';
		}
	}
	 possibilityCreateService.setPossibility(requestObject).success(function () {
      toaster.pop('Success','POSSIBILITY Created Successfully.');
      $modalInstance.dismiss('cancel');
    }).error(function (err) {
      $scope.authError = err.message;
      toaster.pop('Fail','failed.');
    })
} 
$scope.getLegalEntity = function(val)
{
	possibilityCreateService.getLegalEntity(val).then(function(response){
		
	})

};
 $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {
                      username: $scope.username,
                      file: file  
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        $scope.log = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.log;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                      evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + 
                     '% ' + evt.config.data.file.name + '\n' + 
                      $scope.log;
                });
              }
            }
        }
    };
  }]);
