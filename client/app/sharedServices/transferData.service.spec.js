/**
 * Created by opankov on 5/19/2016.
 */
'use strict';

describe('Service: transferData', function(){
  var mockDefaultData,
      mockLocalStorage,
      transferDataSrv;

  beforeEach(function() {

    module('videoServersApp');

    module(function($provide) {
      $provide.factory('defaultData', function() {

        return {
          getServers: getServers,
          getVersions: getVersions
        };

        function getServers() {
          return [{
            "ip": "10.47.108.594",
            "name": "ATOMICA",
            "currentVersion": "336.25.80.52"
          },
            {
              "ip": "10.47.108.766",
              "name": "OPTYK",
              "currentVersion": "941.52.80.21",
              "_id" : 5
            }]
        }

        function getVersions() {
          return ["111.93.55.31", "351.22.82.91", "981.55.10.23"];
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
      mockDefaultData = _defaultData_;
      mockLocalStorage = _localStorageService_;
      transferDataSrv = _transferDataFactory_;

    });
  });

  describe('initialization', function(){

    var servers, versions;

    beforeEach(function() {
      servers = [{
        "ip": "10.47.108.594",
        "name": "ATOMICA",
        "currentVersion": "336.25.80.52",
        "_id": 6
      },
        {
          "ip": "10.47.108.766",
          "name": "OPTYK",
          "currentVersion": "941.52.80.21",
          "_id" : 5
        }];

      versions = ["111.93.55.31", "351.22.82.91", "981.55.10.23"];
    });

    it('should init correctly', function() {

      expect(mockLocalStorage.getFromLocalStorage).toHaveBeenCalledWith('servers');
      expect(mockLocalStorage.getFromLocalStorage).toHaveBeenCalledWith('versions');
      expect(mockLocalStorage.getFromLocalStorage.calls.count()).toBe(2);


      expect(mockLocalStorage.saveToLocalStorage).toHaveBeenCalledWith('versions', versions);
      expect(mockLocalStorage.saveToLocalStorage.calls.count()).toBe(2);
    });

    it('should init servers and versions with correctly data', function() {

      expect(transferDataSrv.getServersList().length).toBe(2);
      expect(transferDataSrv.getServersList()[0]._id).toBe(6);
      expect(transferDataSrv.getVersions().length).toBe(3);

    });
  });

  describe('CRUD operations', function() {
    var getStorageCount, saveToStorageConut;

    beforeEach(function() {
      getStorageCount = mockLocalStorage.getFromLocalStorage.calls.count();
      saveToStorageConut = mockLocalStorage.saveToLocalStorage.calls.count();
    });

    it('should use localStorage for get data', function() {
      transferDataSrv.getServersList();
      transferDataSrv.getVersions();
      expect(mockLocalStorage.getFromLocalStorage.calls.count()).toBe(getStorageCount+2);
    });
    
  });




});
