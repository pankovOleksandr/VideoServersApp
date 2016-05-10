'use strict';

(function() {

class MainController {

  constructor(transferDataService) {

    this.servers = [];
    this.versions = [];
    this.transferDataService = transferDataService();
    this.modeStates = {
      isCreate: false,
      isEdit : {}
    };
    this.newItem = {};
    this.serverCopy = {};

  }

  $onInit() {

    console.log("INIT CONTROLLER");
    this.servers = this.transferDataService.getServersList();
    this.versions = this.transferDataService.getAllVersions();

  }

  create() {
    this.modeStates.isCreate = true;
  }

  createActions($event, newItem) {
    var btnType = $event.currentTarget.innerHTML;
    switch (btnType) {
      case "Create":
        if (newItem.ip || newItem.name || newItem.currentVersion) {
          this.transferDataService.createServerItem(newItem);
          this.modeStates.isCreate = false;
          this.newItem = {};
        } else {
          alert('Empty new object');
        }
        break;

      case "Cancel":
        this.modeStates.isCreate = false;
        this.newItem = {};
        break;
    }
  }

  handleEdit(item, $index) {

    if (this.modeStates.isEdit[$index]) {
      this.transferDataService.editServiceItem(item);
      this.modeStates.isEdit[$index] = null;
      return;
    }

    for (var key in this.modeStates.isEdit) {
      if (this.modeStates.isEdit.hasOwnProperty(key)) delete this.modeStates.isEdit[key];
    };

    angular.copy(item, this.serverCopy);
    this.modeStates.isEdit[$index] = true;
  }

  reset(item, $index) {
    this.transferDataService.editServiceItem(this.serverCopy);
    this.modeStates.isEdit[$index] = null;
  }

  delete(item, $index) {
    this.transferDataService.deleteServiceItem(item);
    this.modeStates.isEdit[$index] = null;
  }

  updateField(item, prop, value) {
    console.log('in updateField');
    item[prop] = value;
    this.transferDataService.editServiceItem(item);
  }
  /** function used for filter's select
   */
  getUsedVersion() {
    var usedVersions = [];
    for (var i=0; i<this.servers.length; i++) {
      usedVersions.push( this.servers[i].currentVersion );
    }
    return usedVersions;
  }
}

angular.module('videoServersApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: 'main'
  });

})();
