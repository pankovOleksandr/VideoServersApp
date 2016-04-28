'use strict';

(function() {

class MainController {

  constructor($http, transferDataService, $scope) {
    this.$http = $http;
    this.awesomeThings = [];
    console.log("transferDataService", transferDataService);
    this.transferDataService = transferDataService();
    $scope.watchCollection(this.awesomeThings, fucntion() {
        console.log("In watch");
    })
  }

  $onInit() {
    // this.$http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   console.log("this.things", this.awesomeThings);
    // });
    console.log("INIT CONTROLLER");
    this.awesomeThings = this.transferDataService.getServisesList();
    console.log('awesomeThings', this.awesomeThings);

  }
}

angular.module('videoServersApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
