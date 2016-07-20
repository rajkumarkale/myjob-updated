angular.module('com.module.possibility').factory('saleModuleService', function ($http, appConfig, $q, SaleModel) {
    'use strict';
    var BASEURI = 'http://172.16.1.103:8000';/*appConfig.apiUrl;*/
    var getSalesData = function (params) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            params: params,
            url: BASEURI+'/api/sale'
        }).then(function (sales) {
            var salesList = sales.data.map(function (sale) {
                return new SaleModel(sale)
            });
            console.log("sales", salesList);
            deferred.resolve(salesList);

        }, function (err) {});
        return deferred.promise;
    };

    var createSale = function (data) {
        return $http({
            method: 'POST',
            url: BASEURI + '/api/sale',
            data: data
        });
    };

    var updateSale = function (data) {
        return $http({
            method: 'PUT',
            url: BASEURI + '/api/sale/' + data._id,
            data: data
        });
    };
    var createDiscussion = function (data, id) {
        return $http({
            method: 'POST',
            url: BASEURI + '/api/sale/' + id + '/discussions',
            data: data
        });
    };

    var share = function (id, shareId) {
        return $http({
            method: 'GET',
            params: {
                shareId: shareId
            },
            url: BASEURI + '/api/sale/' + id + '/share'
        });
    };

    var transfer = function (id, transferId) {
        return $http({
            method: 'GET',
            params: {
                transferId: transferId
            },
            url: BASEURI + '/api/sale/' + id + '/transfer'
        });
    };

    var getDashboardData = function () {
        return $http({
            method: 'GET',
            url: BASEURI + '/api/sale/stats'
        });
    };
  var deleteDocument=function(id,documentId){
    return $http({
      method:'DELETE',
      url:BASEURI +'/api/sale/'+id+'/documents/'+documentId
    })
  };

  var deletePoc=function(id,pocId){
    return $http(
      {
        method: 'DELETE',
        url:BASEURI+'/api/sale/'+id+'/poc/'+pocId
      })
  };

    return {
        getSalesData: getSalesData,
        createSale: createSale,
        updateSale: updateSale,
        createDiscussion: createDiscussion,
        transfer:transfer,
        share:share,
        getDashboardData:getDashboardData,
        deleteDocument:deleteDocument,
        deletePoc:deletePoc
    };
});
