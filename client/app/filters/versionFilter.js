/**
 * Created by opankov on 5/10/2016.
 */

'use strict';

(function(angular) {
  angular.module('videoServersApp.filters', [])
    .filter('versionFilter', function createVersionFilter() {
      return function(items, version) {
        if (version === 'All' ) {
          return items;
        }
        return items.filter(function(item) {
          return item.currentVersion === version;
        });
      }
    })
})(angular);
