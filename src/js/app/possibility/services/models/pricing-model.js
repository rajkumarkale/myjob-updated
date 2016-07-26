/**
 * Created by rkale on 7/26/2016.
 */
var module = angular.module('com.module.possibility');
module.factory('pricingModel', function () {
  function pricingMode(modelData) {
    this.pricingValue=modelData.pricingValue;
    this.creditDays=modelData.creditDays;
    this.payCycle=modelData.payCycle;
    this.billCycle=modelData.billCycle;
    
  }

  return pricingMode;
});
