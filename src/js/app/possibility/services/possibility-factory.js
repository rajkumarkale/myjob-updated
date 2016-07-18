angular.module('com.module.possibility').factory('possibilityCreateServices', function ($http, appConfig,$q,SaleModel) {
  'use strict';
  var BASEURI = appConfig.apiUrl;
  var getSalesData = function (data) {
    var deferred= $q.defer();
     $http({
      method: 'GET',
      url: 'http://172.16.1.103:8000/api/sale'
    }).then(function(sales){
        var salesList= sales.data.map(function(sale){
        return new SaleModel(sale)    
        })
        console.log("sales",salesList)
        deferred.resolve(salesList);
        
    });
      return deferred.promise;
  };
    var getStatusCount=function(salesList,stage,status){
    return (salesList.filter(function(sale){
        return sale[stage]===status;
    }).length || 0);
};
    return {
    getSalesData:getSalesData,
     getStatusCount:getStatusCount   
    };
});
