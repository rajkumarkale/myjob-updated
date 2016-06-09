angular.module('com.module.possibility')
    .controller('createPossibilityController', ['$scope', 'toaster', '$state', '$stateParams', 'FileUploader', 'possibilityCreateService', 'Upload', '$modal', 'appConfig', '$cookies','$timeout', function($scope, toaster, $state, $stateParams, FileUploader, possibilityCreateService, Upload, $modal, appConfig, $cookies,$timeout) {
        $scope.init = function($stateParams) {
            $scope.isEditable = false;
            $scope.employeeSize = appConfig.possibility.employeeSize;
            $scope.groupTurnover = appConfig.possibility.groupTurnover;
            $scope.businessVertical = appConfig.possibility.businessVertical;
            $scope.customerType = appConfig.possibility.customerType;
            $scope.uploadFiles= [];
            if ($stateParams.possibility) {
                $scope.title = "Edit Possibility";
                $scope.myPromise = possibilityCreateService.possibilityDetails($stateParams.possibility.client_unit_id).then(function(response) {
                    $scope.createPossibility = response.data;
                    $scope.client_unit_id = $scope.createPossibility.point_of_contacts[0].client_unit_id;
                    $scope.point_of_contacts = $scope.createPossibility.point_of_contacts;
                    $scope.employeeSize.selectedItem = $scope.getSlectedItem($scope.createPossibility.employee_size, $scope.employeeSize);
                    $scope.groupTurnover.selectedItem = $scope.getSlectedItem($scope.createPossibility.turnover, $scope.groupTurnover);
                    $scope.businessVertical.selectedItem = $scope.getSlectedItem($scope.createPossibility.vertical, $scope.businessVertical);
                    $scope.customerType.selectedItem = $scope.getSlectedItem($scope.createPossibility.customer_type, $scope.customerType);
                    $scope.point_of_contacts.map(function(pocObject){
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
                    $scope.isNewPossibility = false;
                });
            } else {
                $scope.isNewPossibility = true;
                $scope.title = "New Possibility";
                $scope.createPossibility = {};
                $scope.point_of_contacts =[{name:"",designation:"",remote:"",local:"",phone:"",support_location:"",email_id:""}];

            }
        };
        $scope.init($stateParams);
        $scope.getNewPointofContact =  function(){
        	var obj = {name:"",designation:"",remote:"",local:"",phone:"",support_location:"",email_id:""};
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




        $scope.save = function(possibilityObject) {
        	if($scope.isNewPossibility)
            $scope.processRequest(possibilityObject);
        	else{
        		var current_status ={stage:possibilityObject.current_status.stage,status:possibilityObject.current_status.status};
        		possibilityObject.employee_size = $scope.employeeSize.selectedItem.key;
            	possibilityObject.turnover = $scope.groupTurnover.selectedItem.key;
            	possibilityObject.vertical = $scope.businessVertical.selectedItem.key;
            	possibilityObject.customer_type = $scope.customerType.selectedItem.key;
        		possibilityObject.client_unit_id = $scope.client_unit_id;
        		possibilityObject.current_status = current_status;
        		$scope.point_of_contacts.map(function(pocObj){
            	var requestPocObject ={}; 
            	requestPocObject.name = pocObj.name;
            	requestPocObject.phone = pocObj.phone;
            	requestPocObject.designation = pocObj.designation;
            	requestPocObject.email_id = pocObj.email_id;
            	requestPocObject.support_location = pocObj.support_location;
            	if (pocObj.remote && pocObj.local) {
                requestPocObject.support_type = 'BOTH';
            } else if (pocObj.remote) {
                requestPocObject.support_type = 'REMOTE';
            } else {
                if (pocObj.local) {
                    requestPocObject.support_type = 'LOCAL';
                }
            }
            possibilityObject.push(requestPocObject);

            })
        		delete possibilityObject._id;
        		delete possibilityObject.created_by;
         		delete possibilityObject.time_created;
         		delete possibilityObject.freeze
       			delete possibilityObject.address.time_updated;
       			delete possibilityObject.time_updated;
       			delete possibilityObject.address.user_id ;
	       		possibilityCreateService.updatePossibility(possibilityObject).success(function() {
                toaster.pop('success', 'POSSIBILITY Created Successfully.');
                $state.go('app.viewPossibility');
            }).error(function(err) {
                $scope.authError = err.message;
            })
        	}

        };
        $scope.isValid = function(val) {
            return (val && ($scope.businessVertical.selectedItem && $scope.employeeSize.selectedItem && $scope.groupTurnover.selectedItem &&
                $scope.customerType.selectedItem))

        };


        $scope.processRequest = function(requestObject) {
            requestObject.user_id = JSON.parse($cookies.userData).userDetails.roles.account.id;
            requestObject.employee_size = $scope.employeeSize.selectedItem.key;
            requestObject.turnover = $scope.groupTurnover.selectedItem.key;
            requestObject.vertical = $scope.businessVertical.selectedItem.key;
            requestObject.customer_type = $scope.customerType.selectedItem.key;
            requestObject.urls = [];
            requestObject.point_of_contacts =[];
            if ($scope.files && $scope.files.length) {
                for (var i = 0; i < $scope.files.length; i++) {
                	var obj ={};
                	obj.url = $scope.files[i].url;
                	obj.type = "OTHERS";
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
            
            possibilityCreateService.setPossibility(requestObject).success(function() {
                $state.go('app.viewPossibility');
                toaster.pop('Success', 'POSSIBILITY Created Successfully.');
            }).error(function(err) {
                $scope.authError = err.message;
            })
        };
        $scope.getLegalEntity = function(val) {
            possibilityCreateService.getLegalEntity(val).then(function() {


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
            $scope.isEditable = true;

        };

        $scope.cancel = function() {
            $state.go('app.viewPossibility');
        };
        $scope.disableForm = function() {
            if (!$scope.isEditable && !$scope.isNewPossibility) {
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
                            $scope.uploadFiles.push(file);
                        }, null, function(evt) {
                            
                        });
                    }
                }
            }
        };
    }]);
