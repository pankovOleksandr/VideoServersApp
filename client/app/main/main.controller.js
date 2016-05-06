'use strict';

(function() {

class MainController {

  constructor(transferDataService) {

    this.servers = [];
    this.transferDataService = transferDataService();
    this.modeStates = {
      isCreate: false,
      isEdit : {}
    };
    this.newItem = {};

  }

  $onInit() {

    console.log("INIT CONTROLLER");
    this.servers = this.transferDataService.getServersList();
    console.log('this', this);

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

  editStart(i, item) {
    for (var key in this.modeStates.isEdit) {
      if (this.modeStates.isEdit.hasOwnProperty(key)) delete this.modeStates.isEdit[key];
    };
    this.modeStates.isEdit[i] = true;
  }

  editCancel() {

  }

  delete(item, $index) {
    this.transferDataService.deleteServiceItem(item);
    console.log('index', $index);
    this.modeStates.isEdit[$index] = null;
  }

}
//   function MainController() {
//     this.test = "test";
//   }

angular.module('videoServersApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: 'main'
  });

})();
