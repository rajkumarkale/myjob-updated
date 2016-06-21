angular.module('com.module.possibility')
    .controller('createPossibilityController', ['$scope', 'toaster', '$state','$stateParams', 'FileUploader', 'possibilityCreateService', 'Upload', '$modal', 'appConfig', '$cookies','$q' , function($scope, toaster, $state, $stateParams, FileUploader, possibilityCreateService, Upload, $modal, appConfig, $cookies,$q) {
        $scope.init = function($stateParams) {

            $scope.isEditable = false;
            $scope.employeeSize = appConfig.possibility.employeeSize;
            $scope.groupTurnover = appConfig.possibility.groupTurnover;
            $scope.businessVertical = appConfig.possibility.businessVertical;
            $scope.customerType = appConfig.possibility.customerType;
            $scope.contactType = appConfig.possibility.contactType;
            $scope.status = appConfig.possibility.status;

            $scope.uploadFiles= [];
            if ($stateParams.possibility) {
                $scope.title = "Edit Possibility";
                $scope.myPromise = possibilityCreateService.possibilityDetails($stateParams.possibility.client_unit_id).then(function(response) {
                    $scope.createPossibility = response.data;
                    $scope.client_unit_id = $scope.createPossibility.point_of_contacts[0].client_unit_id;
                    $scope.point_of_contacts = $scope.createPossibility.point_of_contacts;
                    $scope.createPossibility.freeze = $scope.createPossibility.client_freeze_details?true:false;
                    $scope.employeeSize.selectedItem = $scope.getSlectedItem($scope.createPossibility.employee_size, $scope.employeeSize);
                    $scope.groupTurnover.selectedItem = $scope.getSlectedItem($scope.createPossibility.turnover, $scope.groupTurnover);
                    $scope.businessVertical.selectedItem = $scope.getSlectedItem($scope.createPossibility.vertical, $scope.businessVertical);
                    $scope.customerType.selectedItem = $scope.getSlectedItem($scope.createPossibility.customer_type, $scope.customerType);
                    $scope.status.selectedItem = $scope.getSlectedItem($scope.createPossibility.current_status.status,$scope.status);
                    $scope.point_of_contacts.map(function(pocObject){
                    	if(pocObject.contact_type !== 'PRIMARY'){
                    		var selectedItem = pocObject.contact_type;
                    		pocObject.contact_type=appConfig.possibility.contactType;
                    pocObject.contact_type.selectedItem = $scope.getSlectedItem(selectedItem, pocObject.contact_type);

                    	}
                    	pocObject.isOpen = true;
                    if (pocObject.support_type === 'BOTH') {
                        pocObject.remote = true;
                        pocObject.local = true;
                    } else if (pocObject.support_type === 'REMOTE') {
                        pocObject.remote = true;
                    } else {
                        if (pocObject.support_type ==='LOCAL') {
                            pocObject.local = true;
                        }
                    }
                });
                    console.log($scope.point_of_contacts);
                    $scope.isNewPossibility = false;
                });
            } else {
                $scope.isNewPossibility = true;

                $scope.title = "New Possibility";
                $scope.createPossibility = {};
                $scope.point_of_contacts =[{name:"",designation:"",remote:"",local:"",phone:"",support_location:"",email_id:"",contact_type:"PRIMARY",isOpen:true}];

            }
        };
        $scope.init($stateParams);
        $scope.getNewPointofContact =  function(){
        	var obj = {name:"",designation:"",remote:"",local:"",phone:"",support_location:"",email_id:"",contact_type:appConfig.possibility.contactType,isOpen:true};
            $scope.point_of_contacts.map(function(obj){
                obj.isOpen = false;
            })
        	 $scope.point_of_contacts.push(obj)

        };
        $scope.$watch('files', function() {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function() {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.createClient = function() {
            var modalInstance = $modal.open({
                templateUrl: 'js/app/possibility/views/create-client.html',
                backdrop: 'static',
                controller: 'createClientModalInstanceCtrl',
                size: 'lg'
            });
            modalInstance.result.then(function() {});
        };
        $scope.onClose = function() {
            if($scope.isEditable !== true){
                $state.go('app.viewPossibility');
            }else{
            var modalInstance = $modal.open({
                templateUrl: 'js/app/possibility/views/on-close-modal.html',
                backdrop: 'static',
                controller: 'createClientModalInstanceCtrl',
                size: 'sm'
            });
            modalInstance.result.then(function() {});
                }
        };

           $scope.save =function(possibilityObject) {
        	if($scope.isNewPossibility){
            $scope.createPromise=asyncProcessRequest(possibilityObject);}
        	else{$scope.savePromise=asyncSave(possibilityObject); }
           };
            function asyncSave(possibilityObject) {
            return $q( function() {
                
        		var status ={current_status_id:$scope.point_of_contacts[0]._id,status:$scope.status.selectedItem.key};
        		possibilityObject.employee_size = $scope.employeeSize.selectedItem.key;
            	possibilityObject.turnover = $scope.groupTurnover.selectedItem.key;
            	possibilityObject.vertical = $scope.businessVertical.selectedItem.key;
            	possibilityObject.customer_type = $scope.customerType.selectedItem.key;
        		possibilityObject.client_unit_id = $scope.client_unit_id;
        		possibilityObject.status = status;
        		possibilityObject.user_id = $scope.point_of_contacts[0].user_id;
        		possibilityObject.point_of_contacts =[];
        		 possibilityObject.urls = [];
             if ($scope.uploadFiles && $scope.uploadFiles.length) {
                for (var i = 0; i < $scope.uploadFiles.length; i++) {
                	var obj ={};
                	obj.url = $scope.uploadFiles[i].url;
                	obj.type = $scope.uploadFiles[i].documentType.selectedItem.key;
                	possibilityObject.urls.push(obj);
                }
            }
        		$scope.point_of_contacts.map(function(pocObj){
            	var requestPocObject ={};
            	requestPocObject._id = pocObj._id;
            	requestPocObject.name = pocObj.name;
            	requestPocObject.phone = pocObj.phone;
            	requestPocObject.designation = pocObj.designation;
            	requestPocObject.email_id = pocObj.email_id;
            	requestPocObject.support_location = pocObj.support_location;
            	requestPocObject.user_id =pocObj.user_id;
            	requestPocObject.contact_type =pocObj.contact_type.selectedItem?pocObj.contact_type.selectedItem.key:pocObj.contact_type;

            	if (pocObj.remote && pocObj.local) {
                requestPocObject.support_type = 'BOTH';
            } else if (pocObj.remote) {
                requestPocObject.support_type = 'REMOTE';
            } else {
                if (pocObj.local) {
                    requestPocObject.support_type = 'LOCAL';
                }
            }
            possibilityObject.point_of_contacts.push(requestPocObject);

            })
        		delete possibilityObject._id;
        		delete possibilityObject.created_by;
         		delete possibilityObject.time_created;
         		delete possibilityObject.freeze
       			delete possibilityObject.address.time_updated;
       			delete possibilityObject.time_updated;
       			delete possibilityObject.address.user_id ;
       			delete possibilityObject.documents;
       			delete possibilityObject.current_status;
                delete possibilityObject.client_freeze_details;
	       		possibilityCreateService.updatePossibility(possibilityObject).success(function() {
                toaster.pop('success', 'POSSIBILITY Created Successfully.');
                $state.go('app.viewPossibility');
            }).error(function(err) {
                $scope.authError = err.message;
            })
        	
        });
                      }
           
        
        $scope.isValid = function(val) {
            return (val && ($scope.businessVertical.selectedItem && $scope.employeeSize.selectedItem && $scope.groupTurnover.selectedItem &&
                $scope.customerType.selectedItem))

        };


        function asyncProcessRequest(requestObject) {
            return $q( function() {
            requestObject.user_id = JSON.parse($cookies.userData).userDetails.roles.account.id;
            requestObject.employee_size = $scope.employeeSize.selectedItem.key;
            requestObject.turnover = $scope.groupTurnover.selectedItem.key;
            requestObject.vertical = $scope.businessVertical.selectedItem.key;
            requestObject.customer_type = $scope.customerType.selectedItem.key;
            requestObject.urls = [];
            requestObject.point_of_contacts =[];
            if ($scope.uploadFiles && $scope.uploadFiles.length) {
                for (var i = 0; i < $scope.uploadFiles.length; i++) {
                	var obj ={};
                	obj.url = $scope.uploadFiles[i].url;
                	obj.type = $scope.uploadFiles[i].documentType.selectedItem.key;
                	requestObject.urls.push(obj);
                }
            }
            $scope.point_of_contacts.map(function(pocObj){
            	var requestPocObject ={};
            	requestPocObject.name = pocObj.name;
            	requestPocObject.phone = pocObj.phone;
            	requestPocObject.designation = pocObj.designation;
            	requestPocObject.email_id = pocObj.email_id;
            	requestPocObject.support_location = pocObj.support_location;
            	requestPocObject.contact_type =pocObj.contact_type.selectedItem?pocObj.contact_type.selectedItem.key:pocObj.contact_type;
            	if (pocObj.remote && pocObj.local) {
                requestPocObject.support_type = 'BOTH';
            } else if (pocObj.remote) {
                requestPocObject.support_type = 'REMOTE';
            } else {
                if (pocObj.local) {
                    requestPocObject.support_type = 'LOCAL';
                }
            }
            requestObject.point_of_contacts.push(requestPocObject);

            })

            var possibilityCreatePromise=possibilityCreateService.setPossibility(requestObject).success(function() {

                $state.go('app.viewPossibility');
                toaster.pop('Success', 'POSSIBILITY Created Successfully.');
            }).error(function(err) {
                $scope.authError = err.message;
            })
        })
        };
        
        $scope.getSlectedItem = function(selectedItem, srcObj) {
            var returnObj;
            angular.forEach(srcObj.data, function(obj) {
                if (obj.displayText === selectedItem || obj.key === selectedItem) {
                    returnObj = obj;
                }
            });
            return returnObj;

        };
        $scope.editForm = function() {
        	if($scope.createPossibility.current_status.status !== "MET"){
        		            $scope.isEditable = true;

        	}

        };

        $scope.cancel = function() {
            $state.go('app.viewPossibility');
        };
        $scope.disableForm = function() {
            if (!$scope.isEditable && !$scope.isNewPossibility ) {
                var className = 'app-container-blur';
                return className;
            }
        };

        $scope.upload = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        Upload.upload({
                            url: appConfig.apiUrl+'/api/upload/file',
                            data: {
                                content: file
                            }
                        }).then(function(resp) {
                            file.url = resp.data.url;
                            file.documentType = angular.copy(appConfig.possibility.documentType);
                            $scope.uploadFiles.push(file);
                        }, null, function(evt) {

                        });
                    }
                }
            }
        };
        $scope.toggleOpen = function(poc){
        	return poc.isOpen =!poc.isOpen;
        };
    }]);
