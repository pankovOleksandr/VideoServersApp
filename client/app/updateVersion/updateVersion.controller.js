/**
 * Created by opankov on 5/10/2016.
 */

'use strict';

(function () {

  function UpdateVersionController($scope) {
    var ctrl = this;
    ctrl.selectMode = false;
    ctrl.myVersion = ctrl.versions[0];
    ctrl.handleUpdate = function() {
      if (ctrl.selectMode) {
        ctrl.onUpdate({value: ctrl.myVersion});
      }
      ctrl.selectMode = !ctrl.selectMode;
    }
  }

  angular.module('videoServersApp')
    .component('hmUpdateVersion', {
      templateUrl: 'app/updateVersion/updateVersion.html',
      controller: UpdateVersionController,
      bindings: {
        onUpdate: '&',
        versions: '<'
      }
    });

})();
