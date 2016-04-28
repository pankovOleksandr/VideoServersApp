'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
    this.awesomeThings = [];
  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      console.log("this.things", this.awesomeThings);
    });
  }
}

angular.module('videoServersApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
