function Discussion(modelData) {
    this.contactPerson = modelData.contactPerson;
    this.documents = modelData.documents;
    this.loggedBy = modelData.loggedBy;
    this.mode = modelData.mode;
    this.summary = modelData.summary;
    this.timeOfDiscussion = modelData.timeOfDiscussion;
    this.venue = modelData.venue;
}
Discussion.prototype.create=function(){
    //this.parent.id
}
var module=angular.module('com.module.possibility');
module.factory('DiscussionModel',function(){
    return Discussion;
})
