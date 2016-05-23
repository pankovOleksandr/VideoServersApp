
(function() {

  'use strict';
class MainController {

  constructor(transferDataFactory, $scope, $q, $timeout) {
    this.servers = [];
    this.versions = [];
    this.transferDataFactory = transferDataFactory;
    this.modeStates = {
      isCreate: false,
      isEdit : {},
      isUpdate: {},
      toDefault: toDefault
    };
    this.newItem = {};
    this.filterValue = 'All';
    this.editStartedflag = false;

    //functions to handle buttons behavior
    this.handleRestart = handleRestart;
    this.handleCreate = handleCreate;
    this.handleAdd = handleAdd;
    this.handleCancelCreating = handleCancelCreating;
    this.handleEdit = handleEdit;
    this.handleSave = handleSave;
    this.handleReset = handleReset;
    this.handleDelete = handleDelete;
    this.handleUpdate = handleUpdate;

    $scope.$on('transferData: dataRefreshed', this.updateServers.bind(this));

    function toDefault() {
      this.isCreate = false;
      this.isEdit = {};
      this.isUpdate = {};
    }

    function handleRestart() {
      var _self = this;
      this.isLoading = 'progress';
      var promise = $q(function(resolve,reject) {
        $timeout(function() {
          _self.getInitialValues();
          _self.modeStates.toDefault();
          _self.isLoading = 'message';
          resolve();
        }, 2000);
      })
        .then(function() {
          $timeout(function() {
            _self.isLoading = '';
          }, 1500);
        });
    }
    function handleCreate() {
      if (this.modeStates.isCreate) {
        this.modeStates.isCreate = !this.modeStates.isCreate;
      } else {
        this.modeStates.toDefault();
        this.modeStates.isCreate = true;
      }
    }
    function handleAdd(newItem) {
      try{
        if (newItem.ip || newItem.name || newItem.currentVersion) {
          this.addItem(newItem);
          this.updateServers();
          this.modeStates.isCreate = false;
          this.newItem = {};
        } else {
          throw Error('You can\'t create empty object');
        }
      } catch(e) {
        console.log(e);
      }
    }
    function handleCancelCreating() {
      this.modeStates.isCreate = false;
      this.newItem = {};
    }
    function handleEdit($index) {

      if (this.editStartedflag) {
        this.editStartedflag = false;
        this.updateServers();
      }
      this.modeStates.toDefault();
      this.editStartedflag = true;
      this.modeStates.isEdit[$index] = true;
    }
    function handleSave(editItem) {
      try {
        if (!editItem.ip && !editItem.name && !editItem.currentVersion) {
          throw Error('You can\'t save empty item');
        } else {
          this.modeStates.toDefault();
          this.editStartedflag = false;
          this.saveItem(editItem);
          this.updateServers();
        }
      } catch(e) {
        console.log(e);
      }
    }
    function handleReset() {
      this.modeStates.toDefault();
      this.updateServers();
    }
    function handleDelete(item) {
      this.deleteItem(item);
      this.modeStates.toDefault();
      this.updateServers();
    }
    function handleUpdate($index) {

      if (this.modeStates.isUpdate[$index]) {
        this.modeStates.isUpdate[$index] = false;
      } else {
        this.modeStates.toDefault();
        this.modeStates.isUpdate[$index] = true;
      }
    }

  }

  $onInit() {

    this.servers = this.getServers();
    this.versions = this.getVersions();

  }

  addItem(newItem) {
      this.transferDataFactory.createServerItem(newItem);
  }

  saveItem(item) {
    this.transferDataFactory.editServiceItem(item);
  }

  deleteItem(item) {
    this.transferDataFactory.deleteServiceItem(item);
  }

  getServers() {
    return angular.copy(this.transferDataFactory.getServersList());
  }

  getVersions() {
    return angular.copy(this.transferDataFactory.getVersions());
  }

  updateField(item, prop, value) {
    item[prop] = value;
    this.transferDataFactory.editServiceItem(item);
    this.servers = this.getServers();
  }

  getInitialValues() {
    this.transferDataFactory.getInitialValues();

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

  updateServers() {
    this.servers = this.getServers();
  }

}

angular.module('videoServersApp')
  .component('main', {
    templateUrl: 'app/components/main/main.html',
    controller: MainController,
    controllerAs: 'main'
  });

})();
