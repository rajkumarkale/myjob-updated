var module = angular.module('com.module.possibility');
module.factory('SaleModel', function (ClientModel, DiscussionModel, PointOfContactModel, SLATrackerModel, pricingModel, $injector) {
    function Sale(modelData) {
        this._id = modelData._id;
        this.createdBY = modelData.createdBY;
        this.transferedBy = modelData.transferedBy;
        this.possibility = modelData.possibility;
        this.suspect = modelData.suspect;
        this.prospect = modelData.prospect;
        this.stage = modelData.stage;
        this.estimatedClosure = modelData.estimatedClosure;
        this.sourcingFee = modelData.sourcingFee;
        this.approvedBy = modelData.approvedBy;
        this.unfreezedBy = modelData.unfreezedBy;
        this.freezeDuration = modelData.freezeDuration;
        this.permission = modelData.permission;
        this.reasonOfLoss = modelData.reasonOfLoss;
        this.estimatedClosure = modelData.estimatedClosure;
        this.minimumRequirements = modelData.minimumRequirements;
        this.documents = modelData.documents || [];
        if (modelData && modelData.roles) {
            this.roles = {
                id: modelData.roles.id,
                permission: modelData.roles.permission
            }
        }

        this.client = new ClientModel(modelData.client || {});
        this.pointOfContacts = [];
        if (modelData && modelData.pointOfContacts) {
            this.pointOfContacts = modelData.pointOfContacts.map(function (contact) {
                return new PointOfContactModel(contact);
            })
        }
        this.discussions = [];
        if (modelData && modelData.discussions) {
            this.discussions = modelData.discussions.map(function (contact) {
                return new DiscussionModel(contact);
            });
        }
        /*this.requirements = [];
        if (modelData && modelData.requirements) {
            this.requirements = modelData.requirements.map(function (requirement) {
                return new RequirementModel(requirement);
            });
        }*/

        if (modelData && modelData.SLATracker) {
            this.SLATracker = new SLATrackerModel(modelData.SLATracker);
        }
        if (modelData && modelData.pricing) {
            this.pricing = new pricingModel(modelData.pricing);
        }
    }

    Sale.prototype.getPrimaryContact = function () {
        return this.pointOfContacts.filter(function (contact) {
            return contact.isPrimary();
        })[0] || {};
    };
    Sale.prototype.save = function () {
        var saleModuleService = $injector.get('saleModuleService');
        return saleModuleService.createSale(this);
    };
    Sale.prototype.update = function () {
        var saleModuleService = $injector.get('saleModuleService');
        return saleModuleService.updateSale(this);
    };
    return Sale;
});