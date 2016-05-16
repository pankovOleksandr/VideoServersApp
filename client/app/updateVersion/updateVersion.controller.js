/**
 * Created by opankov on 5/10/2016.
 */

'use strict';

(function () {

  function UpdateVersionController($scope, $log) {
    var ctrl = this;

    ctrl.selectMode = false;
    ctrl.myVersion = ctrl.versions[0];
    ctrl.handleUpdate = handleUpdate;
    ctrl.handleCancel = handleCancel;
    $scope.$on('hide-select-mode', hideSelectMode);

    function handleUpdate() {
      ctrl.changeParentState({});
      if (ctrl.selectMode) {
        ctrl.onUpdate({value: ctrl.myVersion});
      }
      ctrl.selectMode = !ctrl.selectMode;
    }

    function handleCancel() {
      if (ctrl.selectMode) {
        ctrl.changeParentState({});
        ctrl.selectMode = !ctrl.selectMode;
      }
    }

    function hideSelectMode() {
      if (ctrl.selectMode) {
        ctrl.selectMode = !ctrl.selectMode;
      }
    }
  }

  angular.module('videoServersApp')
    .component('hmUpdateVersion', {
      templateUrl: 'app/updateVersion/updateVersion.html',
      controller: UpdateVersionController,
      bindings: {
        onUpdate: '&',
        changeParentState: '&',
        versions: '<'
      }
    });

})();
