var module = angular.module('com.module.possibility');
module.factory('SaleModel', function (ClientModel, DiscussionModel, PointOfContactModel,possibilityCreateService) {
    function Sale(modelData) {
        this._id = modelData.id;
        this.owner = modelData.owner;
        this.createdBY = modelData.createdBY;
        this.transferedBy = modelData.transferedBy;
        this.possibility = modelData.possibility;
        this.suspect = modelData.suspect;
        this.prospect = modelData.prospect;
        this.stage=modelData.stage;
        this.estimatedClosure = modelData.estimatedClosure;
        this.sourcingFee = modelData.sourcingFee;
        this.approvedBy = modelData.approvedBy;
        this.unfreezedBy = modelData.unfreezedBy;
        this.freezeDuration = modelData.freezeDuration;

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
            })
        }


    }
    Sale.prototype.getPrimaryContact = function () {
        return this.pointOfContacts.filter(function (contact) {
            return contact.isPrimary();
        })[0] || {};
    };
    Sale.prototype.save=function(){
        possibilityCreateService.createSale(this).then(function(response){
            console.log(response);
        })
    };
    Sale.prototype.update=function(){
        possibilityCreateService.updatePossibility(this).then(function(response){
            console.log(response);
        })
    };
    return Sale;
})