angular.module('com.module.possibility').directive('customSelect',[function (){
    return{
    restrict:'A',
    scope:{
      data:'=data'   },
    templateUrl:'js/app/possibility/views/custom-select-template.html',
    replace:true,
   link:function(s){
    {
        angular.element(document).click(function(){
  var parent = angular.element('.select');
            parent.removeClass('is-open');
});
     s.dataList=s.data;
     /*s.dataList.selectedItem = s.dataList.data[0];*/
     angular.element('.select').off('click').on('click', '.placeholder', function(e) {
         e.stopPropagation();
  var parent = angular.element(this).closest('.select');
         s.$watch('dataList.selectedItem',function(n,o){
             s.dataList.selectedItem =n;
         });
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
  };
}]).filter('companyFilter', [function () {
    return function (clients, seletedItem) {
        if (!angular.isUndefined(clients) && !angular.isUndefined(seletedItem) && seletedItem.length > 0) {
            var tempClients = [];
            angular.forEach(seletedItem, function (id) {
                angular.forEach(clients, function (client) {
                    if (angular.equals(client.status, id)) {
                        tempClients.push(client);
                    }
                });
            });
            return tempClients;
        } else {
            return clients;
        }
    };
}]);

