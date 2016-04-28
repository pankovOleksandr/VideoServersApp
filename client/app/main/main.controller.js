'use strict';

(function() {

class MainController {

  constructor($http, transferDataService) {
    this.$http = $http;
    this.awesomeThings = [];
    console.log("transferDataService", transferDataService);
    this.transferDataService = transferDataService();
  }

  $onInit() {
    // this.$http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   console.log("this.things", this.awesomeThings);
    // });
    console.log("INIT CONTROLLER");
    this.transferDataService.getServisesList();
  }
}

angular.module('videoServersApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
