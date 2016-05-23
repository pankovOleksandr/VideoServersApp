'use strict';

angular.module('videoServersApp')
  .directive('footer', function() {
    return {
      templateUrl: 'app/components/footer/footer.html',
      restrict: 'E',
      link: function(scope, element) {
        element.addClass('footer');
      }
    };
  });
