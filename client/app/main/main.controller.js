'use strict';

(function() {

class MainController {

  constructor(transferDataService, $scope) {

    this.services = [];
    this.transferDataService = transferDataService();
  }

  $onInit() {
    // this.$http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   console.log("this.things", this.awesomeThings);
    // });
    console.log("INIT CONTROLLER");
    this.services = this.transferDataService.getServisesList();
    console.log('awesomeThings', this.services);

  }
}

angular.module('videoServersApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
