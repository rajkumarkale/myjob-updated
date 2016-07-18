angular.module('com.module.possibility').factory('salesModel', function ($http, appConfig) {
    'use strict';

    var getSaleData = function (modelData) {
        var Sale = function () {

        }
        Sale.prototype.save = function () {

        }
        Sale.prototype.update = function () {
            //this
        }


        var model = new Sale();

        if (modelData._id) {
            model._id = modelData._id;
        }
        if (modelData.owner) {
            model.owner = {
                id: modelData.owner.id,
                name: modelData.owner.name
            }
        }
        if (modelData.createdBY) {
            model.createdBY = modelData.createdBY;
        }
        if (modelData.transferedBy) {
            model.transferedBy = modelData.transferedBy;
        }
        if (modelData.possibility) {
            model.possibility = modelData.possibility;
        }
        if (modelData.suspect) {
            model.suspect = modelData.suspect;
        }
        if (modelData.prospect) {
            model.prospect = modelData.prospect;
        }
        if (modelData.estimatedClosure) {
            model.estimatedClosure = modelData.estimatedClosure;
        }
        if (modelData.sourcingFee) {
            model.sourcingFee = modelData.sourcingFee;
        }
        if (modelData.approvedBy) {
            model.approvedBy = modelData.approvedBy;
        }
        if (modelData.unfreezedBy) {
            model.unfreezedBy = modelData.unfreezedBy;
        }
        if (modelData.freezeDuration) {
            model.freezeDuration = modelData.freezeDuration;
        }

        if (modelData.roles) {
            model.roles = {
                id: modelData.roles.id,
                permission: modelData.roles.permission
            }
        }

        model.client = {
            id: modelData.client.id,
            legalName: modelData.client.legalName,
            businessUnit:modelData.client.businessUnit,
            shortName: modelData.client.shortName,
            location: modelData.client.location,
            website: modelData.client.website,
            revenue: modelData.client.revenue,
            turnover: modelData.client.turnover,
            opportunityType: modelData.client.opportunityType,
            employeeSize: modelData.client.employeeSize,
            candidateType: modelData.client.candidateType,
            customerType: modelData.client.customerType,
            vertical: modelData.client.vertical,
            address: {
                address1: modelData.client.address.address1,
                address2: modelData.client.address.address2,
                city: modelData.client.address.city,
                state: modelData.client.address.state,
                country: modelData.client.address.country,
                pin: modelData.client.address.pin
            }
        };

        model.pointOfContacts = [];
        for (var i = 0; i < modelData.pointOfContacts.length; i++) {
            var obj = {};
            obj.name = modelData.pointOfContacts[i].name;
            obj.email = modelData.pointOfContacts[i].email;
            obj.contactType = modelData.pointOfContacts[i].contactType;
            obj.supportType = modelData.pointOfContacts[i].supportType;
            obj.supportArea = modelData.pointOfContacts[i].supportArea;
            obj.supportLocation = modelData.pointOfContacts[i].supportLocation;
            obj.designation = modelData.pointOfContacts[i].designation;
            obj.department = modelData.pointOfContacts[i].department;
            obj.phone = modelData.pointOfContacts[i].phone;
            model.pointOfContacts.push(obj);
        }

        model.discussions = modelData.discussions;

        model.getPrimaryContact = function () {
            return this.pointOfContacts.filter(function (contact) {
                return contact.contactType == "PRIMARY";
            })[0] || {};
        };
        return model;
    }
    return {
        getSaleData: getSaleData
    }
});