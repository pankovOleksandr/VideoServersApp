/**
 * Created by opankov on 5/19/2016.
 */
'use strict';

describe('Service: transferData', function(){
  var defaultData,
      localStorage,
      transferData;

  beforeEach(function() {

    module('videoServersApp');

    module(function($provide) {
      $provide.factory('defaultData', function() {
       
        return {
          getServers: function () {
            return [{
              "ip": "10.47.108.594",
              "name": "ATOMICA",
              "currentVersion": "336.25.80.52"
            },
              {
                "ip": "10.47.108.766",
                "name": "OPTYK",
                "currentVersion": "941.52.80.21"
              }]
          },
          getVersions: function () {
            return ["111.93.55.31", "351.22.82.91", "981.55.10.23"];
          }
        }
      });

      $provide.provider('localStorageService', function() {
        this.$get = function() {
          var setItem = jasmine.createSpy('setItem'),
              getItem = jasmine.createSpy('getItem');
          return {
            saveToLocalStorage : setItem,
            getFromLocalStorage : getItem
          }
        }
      })
    });

    inject(function(_defaultData_, _localStorageService_, _transferDataFactory_ ) {
      defaultData = _defaultData_;
      localStorage = _localStorageService_;
      transferData = _transferDataFactory_;
    });
  });

  it('should TRANSFER DATA', function() {
    console.log('TRANSFER DATA', transferData);


    var ser = transferData.getServersList();
    console.log('SER', ser);
  });
});
