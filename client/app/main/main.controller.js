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

  edit() {
    this.modeStates.isEdit = true;
  }

  delete(item) {
    console.log(item);
    // this.transferDataService.
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
