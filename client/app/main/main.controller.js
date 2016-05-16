'use strict';

(function() {

class MainController {

  constructor(transferDataFactory, $scope) {
    this.servers = [];
    this.versions = [];
    this.transferDataFactory = transferDataFactory();
    this.modeStates = {
      isCreate: false,
      isEdit : {},
      isUpdate: {},
      toDefault: toDefault
    };
    this.newItem = {};
    this.filterValue = 'All';
    this.editStartedflag = false;

    $scope.$on('transferData: dataRefreshed', this.onDataRefresh.bind(this));

    function toDefault() {
      this.isCreate = false;
      this.isEdit = {};
      this.isUpdate = {};
    }
  }

  $onInit() {

    this.servers = this.getServers();
    this.versions = this.getVersions();

  }

  onDataRefresh() {
    this.servers = this.getServers();
  }

  getServers() {
    return angular.copy(this.transferDataFactory.getServersList());
  }

  getVersions() {
    return angular.copy(this.transferDataFactory.getVersions());
  }

  addItem(newItem) {
    if (newItem.ip || newItem.name || newItem.currentVersion) {
      this.transferDataFactory.createServerItem(newItem);
      this.modeStates.isCreate = false;
      this.newItem = {};
      this.servers = this.getServers();
    } else {
      alert('Empty new object');
    }
  }

  saveEdit(item, $index) {
    this.transferDataFactory.editServiceItem(item);
    this.modeStates.toDefault();
    this.servers = this.getServers();
    this.editStartedflag = false;
  }

  resetEdit(item, $index) {
    this.servers = this.getServers();
    this.modeStates.toDefault();
  }

  deleteItem(item, $index) {
    this.transferDataFactory.deleteServiceItem(item);
    this.modeStates.toDefault();
    this.servers = this.getServers();
  }

  updateField(item, prop, value) {
    item[prop] = value;
    this.transferDataFactory.editServiceItem(item);
    this.servers = this.getServers();
  }

  getInitialValues() {
    this.transferDataFactory.getInitialValues();
    this.modeStates.toDefault();
  }

  getUsedVersion() {
    var usedVersions = ['All'];
    for (var i=0; i<this.servers.length; i++) {
      let curVersion = this.servers[i].currentVersion;
      if (usedVersions.indexOf(curVersion) === -1) {
        usedVersions.push( curVersion );
      }
    }
    return usedVersions;
  }

  handleCreate() {
    this.modeStates.toDefault();
    this.modeStates.isCreate = true;
  }

  cancelCreating() {
    this.modeStates.isCreate = false;
    this.newItem = {};
  }

  handleEdit(item, $index) {

    if (this.editStartedflag) {
      this.servers = this.getServers();
      this.editStartedflag = false;
    }

    this.modeStates.toDefault();
    this.editStartedflag = true;
    this.modeStates.isEdit[$index] = true;
  }

  handleUpdate(item, $index) {

    if (this.modeStates.isUpdate[$index]) {
      this.modeStates.isUpdate[$index] = false;
    } else {
      this.modeStates.toDefault();
      this.modeStates.isUpdate[$index] = true;
    }
  }
}

angular.module('videoServersApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: 'main'
  });

})();
