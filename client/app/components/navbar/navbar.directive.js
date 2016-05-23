'use strict';

angular.module('videoServersApp')
  .directive('navbar', () => ({
    templateUrl: 'app/components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
  }));
