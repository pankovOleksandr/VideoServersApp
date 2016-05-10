angular.module('videoServersApp')
      .provider('localStorageService', function() {
        'use strict';

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
                  storage.setItem( createPropName(prop), angular.toJson(val) );
              }

              function getItem(prop) {
                  return angular.fromJson( storage.getItem(createPropName(prop)) );
              }

              function removeItem(prop) {
                  storage.removeItem( createPropName(prop) );
              }

              function clear() {
                  storage.clear();
              }

              return publicAPI = {
                  saveToLocalStorage : setItem,
                  getFromLocalStorage : getItem,
                  removeFromLocalStorage: removeItem,
                  clearLocalStorage : clear
              }
          }

    });

