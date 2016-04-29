/**
 * Created by ramya on 7/7/15.
 */
angular.module('app')
  .filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });
