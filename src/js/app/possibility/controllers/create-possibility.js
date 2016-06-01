angular.module('com.module.possibility')
.controller('createPossibilityController',['$scope','toaster','$state','$stateParams','FileUploader','possibilityCreateService','Upload','$modal','appConfig','$cookies',function($scope,toaster,$state,$stateParams,FileUploader,possibilityCreateService,Upload,$modal,appConfig,$cookies){

		
		$scope.reset = function(){

				return {	
					user_id:"",
					client_id:"",
					legal_name:"", 
					unit_name:"",
					division :"", 
					url:"",
					employee_size:"",
					turnover:"",
					vertical:"",
					customer_type:"",
					freeze:"",
					"address": {
					address_line_1:"",
					address_line_2 :"",
					city :"",
					state  :"",
					country  :"",
					pin:""
					},
					"current_status": {
					stage :"POSSIBILITY",
					status :"NOT_MET"
					 },
					"point_of_contacts": [
					
					{
					name:"", 
					email_id:"", 
					support_type:"", 
					designation:"",
					phone:"",
					}
					]
					}
};

		$scope.init = function($stateParams){
			$scope.isEditable = false;
			if($stateParams.possibility){
			$scope.title = "Edit Possibility";
			$scope.myPromise = possibilityCreateService.possibilityDetails($stateParams.possibility.client_unit_id).then(function(response){
			$scope.createPossibility = response.data;
			 $scope.employeeSize.selectedItem = $scope.createPossibility.employee_size;
			 $scope.groupTurnover.selectedItem = $scope.createPossibility.turnover;
			$scope.businessVertical.selectedItem = $scope.createPossibility.vertical;
			 $scope.customerType.selectedItem = $scope.createPossibility.customer_type;
			 if($scope.createPossibility.point_of_contacts[0].support_type = 'BOTH')
				{
					$scope.remote =true;
					$scope.local = true;
				}else if(requestObject.point_of_contacts[0].support_type = 'REMOTE'){
					$scope.remote = true;
				}else{
				if(requestObject.point_of_contacts[0].support_type = 'LOCAL'){
					$scope.local = true;
				}
			}
			$scope.isNewPossibility = false;
			});
			}else
			{
				$scope.isNewPossibility =true;
				$scope.title = "New Possibility";
				$scope.createPossibility = {};
				$scope.employeeSize  = appConfig.possibility.employeeSize;
				$scope.groupTurnover  = appConfig.possibility.groupTurnover;
				$scope.businessVertical  = appConfig.possibility.businessVertical;
				$scope.customerType  = appConfig.possibility.customerType;
			}
		}
		$scope.init($stateParams);
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


  

 $scope.save = function(possibilityObject){
 	
 	$scope.processRequest(possibilityObject);
   
  };
  $scope.isValid = function(val){
  	return (val  && ($scope.businessVertical.selectedItem && $scope.employeeSize.selectedItem  && $scope.groupTurnover.selectedItem 
  		&& $scope.customerType.selectedItem ))

  };

 
$scope.processRequest = function(requestObject){
	requestObject.user_id = JSON.parse($cookies.user).userDetails._id;
	requestObject.employee_size = $scope.employeeSize.selectedItem.key;
	requestObject.turnover = $scope.groupTurnover.selectedItem.key;
	requestObject.vertical = $scope.businessVertical.selectedItem.key;
	requestObject.customer_type = $scope.customerType.selectedItem.key;
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
	$scope.removeEmptyArrays (requestObject);
	 possibilityCreateService.setPossibility(requestObject).success(function () {
      toaster.pop('Success','POSSIBILITY Created Successfully.');
      //$state.go('app.viewPossibility');
    }).error(function (err) {
      $scope.authError = err.message;
    })
} 
$scope.getLegalEntity = function(val)
{
	possibilityCreateService.getLegalEntity(val).then(function(response){
		

	})

};
$scope.editForm = function(){
	$scope.isEditable = true;

};
$scope.removeEmptyArrays = function (data) {
    for (var key in data) {
        var item = data[key];
        if(!item || item == ""){
        	delete data[key];
        }
        else if (Array.isArray(item)) {
            if (item.length != 0) {
            	for(var i=0 ;i<item.length;i++){
            	if (typeof item[i] == "object"){
            	 for (var key2 in item) {
            	var item2 = item[key2]
            		if(item2 == ""){
            			delete item2[key2];
            	}
            	}
            }
            	}
            }
        } else if (typeof item == "object") {
            for (var key1 in item) {
            	var item1 = data[key1];
            		if(item1 == ""){
            			delete item[key1];

            	}

            }
        }
    }    
};
$scope.cancel = function()
{
		$state.go('app.viewPossibility');
};
$scope.disableForm = function(){
	if(!$scope.isEditable && !$scope.isNewPossibility){
		var className = 'app-container-blur';
		return className;
	}
}

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
