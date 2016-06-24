angular.module('app').factory("discussionService",function(){
    var data;
    var obj={};
    obj.getData=function(){
        return data;
    };
    obj.setData=function(obj){
        data=obj;
    };
    return obj;
});