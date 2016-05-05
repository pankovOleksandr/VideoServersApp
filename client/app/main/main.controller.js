'use strict';

(function() {

class MainController {

  constructor(transferDataService) {

    this.servers = [];
    this.transferDataService = transferDataService();
    this.modeStates = {
      isCreate: false,
      isEdit : false
    }

  }

  $onInit() {

    console.log("INIT CONTROLLER");
    this.servers = this.transferDataService.getServisesList();
    console.log('this', this);

  }

  create() {
    console.log("create method");
    this.modeStates.isCreate = true;
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
