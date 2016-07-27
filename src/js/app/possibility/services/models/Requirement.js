var module = angular.module('com.module.possibility');
module.factory('RequirementModel', function () {
    function Requirement(modelData) {
        this._id=modelData._id;
        this.name = modelData.name;
        this.type =modelData.type;
        this.officeLocation=modelData.officeLocation;
        this.consultingFee=modelData.consultingFee;
        this.manager=modelData.manager;
        this.practice=modelData.practice;
        this.priority=modelData.priority;
        this.jobTitle=modelData.jobTitle;
        this.functionalArea=modelData.functionalArea;
        this.qualification=modelData.qualification;
        this.ageGroupFrom=modelData.ageGroupFrom;
        this.ageGroupTo=modelData.ageGroupTo;   
        this.experienceFrom=modelData.experienceFrom;
        this.experienceTo=modelData.experienceTo;
        this.ctcRangeFrom=modelData.ctcRangeFrom;
        this.ctcRangeTo=modelData.ctcRangeTo;
        this.inydustry=modelData.inydustry;
        this.numberOfPoachCompanies=modelData.numberOfPoachCompanies;
        this.numberOfPositions=modelData.numberOfPositions;
        this.vacancy=modelData.vacancy;
        this.jobLocation=modelData.jobLocation;
        this.primaryLevel=modelData.primaryLevel;
        this.relevantExperienceFrom=modelData.relevantExperienceFrom;
        this.relevantExperienceTo=modelData.relevantExperienceTo;
        this.remarks=modelData.remarks;
        this.targetEmployees=modelData.targetEmployees;
        this.jobDesciption=modelData.jobDesciption;
        
    }
    return Requirement;
});