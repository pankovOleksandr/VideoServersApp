'use strict';

(function() {

class MainController {

  constructor(transferDataFactory) {

    this.servers = [];
    this.versions = [];
    this.transferDataFactory = transferDataFactory();
    this.modeStates = {
      isCreate: false,
      isEdit : {}
    };
    this.newItem = {};
    this.serverCopy = {};

  }

  $onInit() {

    console.log("INIT CONTROLLER");
    this.servers = this.getServers();
    this.versions = this.getVersions();

  }

  getServers() {
    return angular.copy(this.transferDataFactory.getServersList());
  }

  getVersions() {
    return angular.copy(this.transferDataFactory.getVersions());
  }

  handleCreate() {
    this.modeStates.isCreate = true;
  }

  createItem(newItem) {
    if (newItem.ip || newItem.name || newItem.currentVersion) {
      this.transferDataFactory.createServerItem(newItem);
      this.modeStates.isCreate = false;
      this.newItem = {};
      this.servers = this.getServers();
    } else {
      alert('Empty new object');
    }
  }

  cancelCreating() {
    this.modeStates.isCreate = false;
    this.newItem = {};
  }

  handleEdit(item, $index) {

    if (this.modeStates.isEdit[$index]) {
      this.transferDataFactory.editServiceItem(item);
      this.modeStates.isEdit[$index] = false;
      return;
    }

    for (var key in this.modeStates.isEdit) {
      if (this.modeStates.isEdit.hasOwnProperty(key)) delete this.modeStates.isEdit[key];
    };

    angular.copy(item, this.serverCopy);
    this.modeStates.isEdit[$index] = true;
  }

  reset(item, $index) {
    this.transferDataFactory.editServiceItem(this.serverCopy);
    this.modeStates.isEdit[$index] = false;
  }

  deleteItem(item, $index) {
    this.transferDataFactory.deleteServiceItem(item);
    this.modeStates.isEdit[$index] = false;
    this.servers = this.getServers();
  }

  updateField(item, prop, value) {
    item[prop] = value;
    this.transferDataFactory.editServiceItem(item);
    this.servers = this.getServers();
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
