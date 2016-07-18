 

function PointOfContact(modelData){
            this.name = modelData.name;
            this.email = modelData.email;
            this.contactType = modelData.contactType;
            this.supportType = modelData.supportType;
            this.supportArea = modelData.supportArea || 'BUSINESS';
            this.supportLocation = modelData.supportLocation;
            this.designation = modelData.designation;
            this.department = modelData.department;
            this.phone = modelData.phone;   
}
PointOfContact.prototype.isPrimary=function(){
    return this.contactType=="PRIMARY"
}
var module=angular.module('com.module.possibility');
module.factory('PointOfContactModel',function(){
    return PointOfContact;
})
