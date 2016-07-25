function Client(modelData) {
    this.legalName = modelData.legalName;
    this.businessUnit = modelData.businessUnit;
    this.website = modelData.website;
    this.revenue = modelData.revenue;
    this.turnover = modelData.turnover;
    this.employeeSize = modelData.employeeSize;
    this.vertical = modelData.vertical;
    this.customerType = modelData.customerType;
    this.potentialNumbers=modelData.potentialNumbers;
    this.clientName=modelData.clientName;
    this.address = {};
    if (modelData.address) {
        this.address = {
            address1: modelData.address.address1,
            address2: modelData.address.address2,
            city: modelData.address.city,
            state: modelData.address.state,
            country: modelData.address.country,
            pin: modelData.address.pin
        }
    }

}
var module = angular.module('com.module.possibility');
module.factory('ClientModel', function () {
    return Client;
});
