angular.module('com.module.possibility')
    .controller('createPossibilityController', ['$scope', 'toaster', '$state', '$stateParams', 'FileUploader', 'possibilityCreateService', 'Upload', '$modal', 'appConfig', '$cookies','$timeout', function($scope, toaster, $state, $stateParams, FileUploader, possibilityCreateService, Upload, $modal, appConfig, $cookies,$timeout) {
        $scope.init = function($stateParams) {
            $scope.isEditable = false;
            $scope.employeeSize = appConfig.possibility.employeeSize;
            $scope.groupTurnover = appConfig.possibility.groupTurnover;
            $scope.businessVertical = appConfig.possibility.businessVertical;
            $scope.customerType = appConfig.possibility.customerType;
            if ($stateParams.possibility) {
                $scope.title = "Edit Possibility";
                $scope.myPromise = possibilityCreateService.possibilityDetails($stateParams.possibility.client_unit_id).then(function(response) {
                    $scope.createPossibility = response.data;
                    $scope.client_unit_id = $scope.createPossibility.point_of_contacts[0].client_unit_id;
                    $scope.employeeSize.selectedItem = $scope.getSlectedItem($scope.createPossibility.employee_size, $scope.employeeSize);
                    $scope.groupTurnover.selectedItem = $scope.getSlectedItem($scope.createPossibility.turnover, $scope.groupTurnover);
                    $scope.businessVertical.selectedItem = $scope.getSlectedItem($scope.createPossibility.vertical, $scope.businessVertical);
                    $scope.customerType.selectedItem = $scope.getSlectedItem($scope.createPossibility.customer_type, $scope.customerType);
                    if ($scope.createPossibility.point_of_contacts[0].support_type = 'BOTH') {
                        $scope.remote = true;
                        $scope.local = true;
                    } else if (requestObject.point_of_contacts[0].support_type = 'REMOTE') {
                        $scope.remote = true;
                    } else {
                        if (requestObject.point_of_contacts[0].support_type = 'LOCAL') {
                            $scope.local = true;
                        }
                    }
                    $scope.isNewPossibility = false;
                });
            } else {
                $scope.isNewPossibility = true;
                $scope.title = "New Possibility";
                $scope.createPossibility = {};
                $scope.createPossibility.point_of_contacts = [];

            }
        };
        $scope.init($stateParams);
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
        		delete possibilityObject.point_of_contacts[0].time_created;
        		delete possibilityObject._id;
        		delete possibilityObject.created_by;
         		delete possibilityObject.time_created;
         		delete possibilityObject.freeze
       			delete possibilityObject.address.time_updated;
       			delete possibilityObject.time_updated;
       			delete possibilityObject.point_of_contacts[0].client_unit_id ;
       			delete possibilityObject.address.user_id ;
       			delete possibilityObject.point_of_contacts[0]._id ;
        		possibilityCreateService.updatePossibility(possibilityObject).success(function() {
                toaster.pop('Success', 'POSSIBILITY Created Successfully.');
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
            requestObject.user_id = JSON.parse($cookies.user).userDetails._id;
            requestObject.employee_size = $scope.employeeSize.selectedItem.key;
            requestObject.turnover = $scope.groupTurnover.selectedItem.key;
            requestObject.vertical = $scope.businessVertical.selectedItem.key;
            requestObject.customer_type = $scope.customerType.selectedItem.key;
            if ($scope.remote && $scope.local) {
                requestObject.point_of_contacts[0].support_type = 'BOTH';
            } else if ($scope.remote) {
                requestObject.point_of_contacts[0].support_type = 'REMOTE';
            } else {
                if (requestObject.local) {
                    requestObject.point_of_contacts[0].support_type = 'LOCAL';
                }
            }
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
                            $timeout(function() {
                                $scope.log = 'file: ' +
                                    resp.config.data.file.name +
                                    ', Response: ' + JSON.stringify(resp.data) +
                                    '\n' + $scope.log;
                            });
                        }, null, function(evt) {
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
