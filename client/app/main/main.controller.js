'use strict';

(function() {

class MainController {

  constructor(transferDataService, $scope) {

    this.servers = [];
    this.transferDataService = transferDataService();
    this.test = "test";
  }

  $onInit() {

    console.log("INIT CONTROLLER");
    this.servers = this.transferDataService.getServisesList();
    console.log('this', this);

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
