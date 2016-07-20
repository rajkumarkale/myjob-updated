
var module = angular.module('com.module.possibility');
module.factory('DiscussionModel', function (possibilityCreateService) {
    function Discussion(modelData) {
    this.contactPerson = modelData.contactPerson;
    this.documents = modelData.documents;
    this.loggedBy = modelData.loggedBy;
    this.mode = modelData.mode;
    this.type=modelData.type;    
    this.summary = modelData.summary;
    this.timeOfDiscussion = modelData.timeOfDiscussion;
    this.venue = modelData.venue;
}
Discussion.prototype.create = function (data,id) {
    possibilityCreateService.createDiscussion(data,id).then(function(response){
        console.log(response);
    })
};
    return Discussion;
})