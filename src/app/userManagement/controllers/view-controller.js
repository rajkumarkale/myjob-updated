/**
 * Created by revathi on 15/6/15.
 */

angular.module('com.module.userManagement').filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }
        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      out = items;
    }
    return out;
  };
});
angular.module('com.module.userManagement').controller('userManagementViewController',['$scope', 'userManagementFactory','$modal', '$filter', 'toaster', function ($scope, userManagementFactory, $modal, $filter, toaster) {
  'use strict';

  $scope.selected = {
    users: [],
    roles:[]
  };



  /*$scope.Roles = [{
    id: 1, name: 'admin'
  }, {id: 2, name: 'artist'}];*/


  $scope.userInfo = {  roles:[] };
  $scope.userRoles = [];
  $scope.$item = {};
  $scope.getUsers = function (data) {
    userManagementFactory.searchUsers(data).success(function (result) {
      $scope.currentPageUsers = result;
    }).error(function (error) {

    })
  };

  /*$scope.getUsers({name_like: ' '});*/

  $scope.search = function (key) {
    var list = _.filter($scope.usersList, function (elem) {
      if (elem.name.toLowerCase().indexOf(key) >= 0) {
        return elem;
      }
    });
    $scope.totalItems = list.length;
    $scope.curentpageUser = list.slice(start, end);
  };
  $scope.typeAheadUser = function (user) {
    var data = {
      name_like: user
    };
    if (user) {
      userManagementFactory.searchUsers(data).success(function (data) {
        setUsersList(data);
      });
    } else {
      $scope.usersList = $scope.usersList || [];
    }
  };



  function setUsersList(users) {
    var temp = [];
    temp = users;
    $scope.usersList = _.uniq(temp);
  }


  var pluckData = function(array, key){
  var temp = [];
    for(var i=array.length-1; i>=0; --i){
      temp.push(array[i][key]);
    }
    return temp;
  };

  $scope.selectUser = function (item, model) {
    $scope.$item = item;
   $scope.myPromise= userManagementFactory.userProfile(item.id).success(function (response) {
      $scope.userInfo = response.result;
     console.log($scope.userInfo)
    }).error(function (error) {

    })
  };

  $scope.unSelectRole = function(item,model){
    var data = {
      user_id:$scope.userInfo.user_id,
      roles:[item.name]
    };

    $scope.myPromise= userManagementFactory.detachRoles(data).then(function (data) {


      //$scope.role.name = "";
      //$scope.rolesList.push(data.data.result);

    }, function (error) {


    });
  };
  userManagementFactory.readRoles().success(function (response) {
    $scope.rolesList = response;
    }).error(function (error) {
      $scope.rolesList=[];
    });

  $scope.selectRole = function(item,modal){
    var data = { user_id:$scope.userInfo.user_id,role:item.name};
    $scope.myPromise = userManagementFactory.attachRoles(data).then(function (data) {


      //$scope.role.name = "";
      //$scope.rolesList.push(data.data.result);

    }, function (error) {


    });
  };






}]);
