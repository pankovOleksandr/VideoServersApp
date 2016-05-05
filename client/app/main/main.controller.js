'use strict';

(function() {

class MainController {

  constructor(transferDataService) {

    this.servers = [];
    this.transferDataService = transferDataService();
    this.modeStates = {
      isCreate: false,
      isEdit : false
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

  save(newItem) {
    if (this.modeStates.isCreate) {
      this.transferDataService.createServerItem(newItem);
      this.modeStates.isCreate = false;
      this.newItem = {};
    }
    
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
