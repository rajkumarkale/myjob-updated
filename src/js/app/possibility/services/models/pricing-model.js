/**
 * Created by rkale on 7/26/2016.
 */
var module = angular.module('com.module.possibility');
module.factory('pricingModel', function () {
    function pricingMode(modelData) {
        this.creditTerm = modelData.creditTerm;
        this.creditDays = modelData.creditDays;
        this.payCycle = modelData.payCycle;
        this.billCycle = modelData.billCycle;
        this.mode = modelData.mode;

    }

    return pricingMode;
});