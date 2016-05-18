/**
 * Created by opankov on 5/10/2016.
 */
(function () {
  'use strict';
  
  function UpdateVersionController() {
    var ctrl = this;

    ctrl.selectMode = false;
    ctrl.myVersion = ctrl.versions[0];
    ctrl.handleUpdate = handleUpdate;
    ctrl.handleCancel = handleCancel;
    ctrl.handleUpdateVersion = handleUpdateVersion;

    function handleUpdate() {
      ctrl.onUpdate({value: ctrl.myVersion});
      ctrl.changeParentState({});
    }

    function handleCancel() {
      ctrl.changeParentState({});
    }

    function handleUpdateVersion() {
      ctrl.changeParentState({});
    }
  }

  angular.module('videoServersApp')
    .component('hmUpdateVersion', {
      templateUrl: 'app/updateVersion/updateVersion.html',
      controller: UpdateVersionController,
      bindings: {
        onUpdate: '&',
        changeParentState: '&',
        versions: '<',
        isSelected: '<'
      }
    });

})();
