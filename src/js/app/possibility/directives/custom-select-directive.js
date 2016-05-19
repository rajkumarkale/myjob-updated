angular.module('com.module.possibility').directive('customSelect',[function (){
    return{
    restrict:'A',
    scope:{
      data:'=data'   },
    templateUrl:'js/app/possibility/views/custom-select-template.html',
    replace:true,
   link:function(s,e,a){
    {
     s.dataList=s.data;
     angular.element('.select').off('click').on('click', '.placeholder', function() {
  var parent = angular.element(this).closest('.select');
  if (!parent.hasClass('is-open')) {
    parent.addClass('is-open');
    angular.element('.select.is-open').not(parent).removeClass('is-open');
  } else {
    parent.removeClass('is-open');
  }
}).on('click', 'ul>li', function() {
  var parent = angular.element(this).closest('.select');
  parent.removeClass('is-open').find('.placeholder').text($(this).text());
});
   } }
  }
}]);

