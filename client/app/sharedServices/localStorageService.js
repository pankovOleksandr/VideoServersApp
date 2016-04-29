'use strict';
var isDefined = angular.isDefined,
    isUndefined = angular.isUndefined,
    toJson = angular.toJson,
    fromJson = angular.fromJson(json);;


(function() {

  angular.module('videoServersApp')
      .provider('localStorageService', function() {
          var PREFIX = 'Harmonic',
              storage = window.localStorage;

          this.setPrefix = function(newPrefix) {
              PREFIX = newPrefix;
              return this;
          };
          this.setStorageType = function(storageType) {
              if (storageType === 'localStorage' || storageType === 'sessionStorage') {
                  throw new Error('!!!Wrong storage type. Try localStorage or sessionStorage only');
              }
              this.storage = window[storageType];
              return this;
          };

          this.$get = function localStorageFactory() {
              var publicAPI = {};


              function createPropName(prop) {
                  return PREFIX + prop;
              }

              function setItem(prop, val) {
                  storage.setItem( createPropName(prop), toJson(val) );
              }

              function getItem(prop) {
                  return fromJson( storage.getItem(createPropName(prop)) );
              }

              function removeItem(prop) {
                  storage.removeItem( createPropName(prop) );
              }

              function clear() {
                  storage.clear();
              }

              // function getKeysFromStorage() {
              //     var prefixLehgth = PREFIX.length;
              //     var keys = [];
              //     for (var key in storage) {
              //         if (key.substr(0, prefixLength) === prefix) keys.push();
              //     }
              //     return keys;
              // }

              function getAllItems() {

              }

              return publicAPI = {
                  setItem : setItem,
                  getItem : getItem,
                  removeItem: removeItem,
                  clear : clear,
                  getServers : getAllItems,
                  getVersions : getVersions
              }
          }]

    });

})();
