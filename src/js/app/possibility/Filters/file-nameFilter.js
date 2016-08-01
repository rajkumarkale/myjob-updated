/**
 * Created by rkale on 7/21/2016.
 */
angular.module('com.module.possibility').filter('nameFilter',function(){
  return function(name){
    if(name){
      var nameF=name.substring(name.lastIndexOf('/')+1);
      var  firstPart=nameF.substring(0,8);
      var secondPart=nameF.substring(nameF.length-11,nameF.length-5);
      var finalName=firstPart+''+secondPart;
      var name=finalName;
      return  name;
    }
  }


}) .filter('nameFilterTooltip',function(){
  return function(name){
    if(name){
      var nameF=name.substring(name.lastIndexOf('/')+1);
      var  firstPart=nameF.substring(0,nameF.length-5);
      return firstPart;
    }
  }


});
