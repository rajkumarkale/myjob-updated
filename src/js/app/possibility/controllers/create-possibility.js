angular.module('com.module.possibility')
    .controller('createPossibilityController', ['$scope', 'toaster', '$state', '$stateParams', 'FileUploader', 'possibilityCreateService', 'Upload', '$modal', 'appConfig', '$cookies', '$q', 'CoreService', '$filter', '$timeout', 'SaleModel', 'PointOfContactModel', 'DiscussionModel', function ($scope, toaster, $state, $stateParams, FileUploader, possibilityCreateService, Upload, $modal, appConfig, $cookies, $q, CoreService, $filter, $timeout, SaleModel, PointOfContactModel, DiscussionModel) {
        $scope.contactOptions = [{
            key: "REMOTE",
            label: "Remote"
        }, {
            key: "LOCAL",
            label: "Local"
        }];


        $scope.init = function ($stateParams) {
            $scope.isEditable = false;
            $scope.employeeSize = appConfig.possibility.employeeSize;
            $scope.groupTurnover = appConfig.possibility.groupTurnover;
            $scope.businessVertical = appConfig.possibility.businessVertical;
            $scope.customerType = appConfig.possibility.customerType;
            $scope.contactType = appConfig.possibility.contactType;
            $scope.status = appConfig.possibility.status;
            $scope.typeOfDiscussion = appConfig.discussion.typeOfDiscussion;

            $scope.discussion = {};
            $scope.documentTypes;
            $scope.uploadFiles = [];
            $scope.uploadFile = [];

            $scope.point_of_contacts = [];
            $scope.getNewPointofContact = function () {
                var obj = new PointOfContact({});
               // obj.contactType=$scope.contactType;
                $scope.saleObject.pointOfContacts.push(obj);
            };

            if ($stateParams.possibility) {
                $scope.saleObject = $stateParams.possibility;
                $scope.title = "Possibility";
                $scope.freshDiscussion = $scope.saleObject.discussions[0];
                var time = $filter('date')($scope.freshDiscussion.timeOfDiscussion, 'HH:mm a');
                var date = $filter('date')($scope.freshDiscussion.timeOfDiscussion, 'MM/dd/yyyy');
                $scope.discussion.date=date;
                $timeout(function () {
                    $("#dname").removeClass('is-empty');
                    $("#dvenue").removeClass('is-empty');
                    $('#myTime').val(time);
                }, 1000);

                $scope.isNewPossibility = false;

            } else {
                $scope.isNewPossibility = true;
                $scope.title = "New Possibility";
                $scope.saleObject = new SaleModel({});
                var primaryContact = new PointOfContactModel({
                    contactType: "PRIMARY"
                });
                $scope.saleObject.pointOfContacts = [primaryContact];
                $scope.freshDiscussion = new DiscussionModel({});
                $scope.saleObject.discussions = [$scope.freshDiscussion];

                $scope.discussion.time = new Date();
                $scope.groupTurnover.selectedItem = '';
                $scope.businessVertical.selectedItem = '';
                $scope.customerType.selectedItem = '';
                $scope.typeOfDiscussion.selectedItem = '';
                $scope.status.selectedItem = {
                    "key": "NOT_MET",
                    "displayText": "NOT MET"

                };

                $timeout(function () {
                    $('#stat .select ul').remove();
                    $('#stat .select .placeholder').addClass('default-cursor');
                }, 1000);
            }
        };

        $scope.init($stateParams);


        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function () {
            /*if ($scope.file != null) {
                $scope.files = [$scope.file];
            }*/
            $scope.uploads($scope.file);
        });


        //On clicking Update or Save button
        $scope.save = function () {
            document.getElementById('noEdit').style.pointerEvents = 'none';
            
                if ($scope.isNewPossibility) {
                    $scope.createPromise = asyncCreate();
                    /*$state.go('app.viewPossibility');*/
                } else {
                    $scope.updatePromise = asyncUpdate();
                   /* $state.go('app.viewPossibility');*/
                }
            
        };

        //Updating Existing Possibility
        function asyncUpdate() {
            return $q(function () {
                $scope.saleObject.documents = [];
                if ($scope.uploadFiles && $scope.uploadFiles.length) {
                    for (var i = 0; i < $scope.uploadFiles.length; i++) {
                        var obj = {};
                        obj.url = $scope.uploadFiles[i].url;
                        obj.type = $scope.uploadFiles[i].documentType;
                        possibility.urls.push(obj);
                    }
                }
                 $scope.saleObject.update();
            });
        }


        $scope.isValid = function (val) {
            var c1;
            var c2 = true;
            c1 = (val && ($scope.saleObject.client.vertical && $scope.saleObject.client.employeeSize && $scope.saleObject.client.turnover &&
                $scope.saleObject.client.customerType));
            if ($scope.uploadFiles && $scope.uploadFiles.length) {
                for (var i = 0; i < $scope.uploadFiles.length; i++) {

                    if (!$scope.uploadFiles[i].documentType) {
                        c2 = false;
                    }
                }
            }
            return (c1 && c2);
        };

        //Creating new possibility
        function asyncCreate() {
            return $q(function () {
                $scope.saleObject.documents = [];

                if ($scope.uploadFiles && $scope.uploadFiles.length) {
                    for (var i = 0; i < $scope.uploadFiles.length; i++) {
                        var obj = {};
                        obj.url = $scope.uploadFiles[i].url;
                        obj.type = $scope.uploadFiles[i].documentType;
                        $scope.saleObject.documents.push(obj);
                    }
                }

                var time = $filter('date')($scope.discussion.time, 'HH:mm:ss');
                var date = $filter('date')($scope.discussion.date, 'MM/dd/yyyy');
                var dtstring = date + ' ' + time;
                var timestamp = new Date(dtstring).getTime();
                $scope.freshDiscussion.timeOfDiscussion = timestamp;
                if ($scope.uploadFile.length > 0) {
                    $scope.freshDiscussion.documents = [{
                        url: $scope.uploadFile[0][0].url
                    }];
                }

                $scope.saleObject.save();
            });
        };



        $scope.editForm = function () {
            if ($stateParams.possibility.possibility !== "MET") {
                $scope.isEditable = true;
                $scope.title = "Edit Possibility";
            }

        };

        $scope.cancel = function () {
            $state.go('app.viewPossibility');
        };

        $scope.disableForm = function () {
            if (!$scope.isEditable && !$scope.isNewPossibility) {
                var className = 'app-container-blur';
                return className;
            }
        };

        $scope.uploadPromise;
        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        $scope.uploadPromise = Upload.upload({
                            url: appConfig.apiUrl + '/api/upload/file',
                            data: {
                                content: file
                            }
                        }).then(function (resp) {
                            file.url = resp.data.url;
                            file.documentTypeOptions = angular.copy(appConfig.possibility.documentType);
                            $scope.uploadFiles.push(file);

                            $scope.fileName = file.name;

                            if (file.name.length > 7) {
                                $scope.fileNamePart1 = file.name.substring(0, 8);
                                $scope.fileNameLen = file.name.length - 7;
                                $scope.fileNamePart2 = file.name.substring($scope.fileNameLen);
                                $scope.fileName = $scope.fileNamePart1 + '...' + $scope.fileNamePart2
                                console.log($scope.fileName + ' ' + file.name);
                            }
                        }, null, function (evt) {

                        });
                    }
                }
            }
        };

        $scope.uploadsPromise;
        $scope.uploads = function (file) {
            $scope.discusfile = [file];
            $scope.uploadFile = [];
            $scope.fileNameLen = file.name.length - 3;
            $scope.fileFormat = file.name.substring($scope.fileNameLen);
            if ($scope.fileFormat == 'pdf' || $scope.fileFormat == 'ocx' || $scope.fileFormat == 'ptx') {
                if ($scope.discusfile && $scope.discusfile.length) {
                    for (var i = 0; i < $scope.discusfile.length; i++) {
                        var _file = $scope.discusfile[0];
                        if (!_file.$error) {
                            $scope.uploadsPromise = Upload.upload({
                                url: appConfig.apiUrl + '/api/upload/file',
                                data: {
                                    content: _file
                                }
                            }).then(function (resp) {
                                _file.url = resp.data.url;
                                _file.documentType = angular.copy(appConfig.possibility.documentType);
                                $scope.uploadFile.push($scope.discusfile);
                                $scope.fileName = _file.name;
                            }, null, function (evt) {

                            });
                        }
                    }
                }
            } else {
                CoreService.toastError('', 'please select supported file format only eg: pdf,docx,pptx');
                document.getElementById("inputText").value = "";
            }
        };

        $scope.toggleOpen = function (poc) {
            return poc.isOpen = !poc.isOpen;
        };

        $scope.removeFiles = function (index) {
            return $scope.uploadFiles.splice(index, 1);
        };

        $scope.removeFilesDB = function (index) {
            var id = $scope.createPossibility.documents[index]._id;
            possibilityCreateService.deleteDocument(id).then(function (response) {
                $scope.createPossibility.documents.splice(index, 1);
            });
        };

        $scope.open = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened1 = !$scope.opened1;
        };

        $scope.removeContact = function (index) {
            if (index == 0) {
                CoreService.toastError('', 'New Possibility should have primary contact');
            } else {
                $scope.saleObject.pointOfContacts.splice(index, 1);
            }
        };

    }]);