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
    inject(function(_defaultData_) {
      mockDefaultData = _defaultData_;
      spyOn(mockDefaultData, "getServers").and.callThrough();
      spyOn(mockDefaultData, "getVersions").and.callThrough();
    });

    inject(function( _localStorageService_, _transferDataFactory_ ) {
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

      expect(mockDefaultData.getServers).toHaveBeenCalled();
      expect(mockDefaultData.getVersions).toHaveBeenCalled();

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

    var getStorageCount, saveToStorageCount, servers;

    beforeEach(function() {
      servers = transferDataSrv.getServersList();
      getStorageCount = mockLocalStorage.getFromLocalStorage.calls.count();
      saveToStorageCount = mockLocalStorage.saveToLocalStorage.calls.count();
    });

    it('should use localStorage for get data', function() {
      transferDataSrv.getServersList();
      transferDataSrv.getVersions();
      expect(mockLocalStorage.getFromLocalStorage.calls.count()).toBe(getStorageCount+2);
    });

    it('should create new item correctly and save', function() {
      var newItem = {
        "ip": "11.11.111.111",
        "name": "TEST",
        "currentVersion": "941.52.80.21"
      };
      transferDataSrv.createServerItem(newItem);

      expect(mockLocalStorage.saveToLocalStorage.calls.count()).toBe(saveToStorageCount+1);
      expect(servers.length).toBe(3);
      expect(servers[0].name).toBe("TEST");

    });

    it('should delete item correctly and save', function() {
      transferDataSrv.deleteServiceItem({
        "_id" : 5
      });
      var servers = transferDataSrv.getServersList();
      expect(servers.length).toBe(1);
      expect(servers[0]._id).toBe(6);
      expect(mockLocalStorage.saveToLocalStorage.calls.count()).toBe(saveToStorageCount+1);
      expect(mockLocalStorage.saveToLocalStorage).toHaveBeenCalledWith('servers', servers);

    });

    it('should edit item correctly and save', function() {
      transferDataSrv.editServiceItem({
        "ip": "1",
        "name": "TEST",
        "currentVersion": "941.52.80.21",
        "_id" : 5
      });

      expect(servers.length).toBe(2);
      expect(servers[1].name).toBe("TEST");
      expect(mockLocalStorage.saveToLocalStorage.calls.count()).toBe(saveToStorageCount+1);
      expect(mockLocalStorage.saveToLocalStorage).toHaveBeenCalledWith('servers', servers);

    });

  });

  describe('reseting value', function() {
    var $httpBackend, $rootScope,
        responseData = [{
          "ip": "10.47.108.594",
          "name": "TEST",
          "currentVersion": "336.25.80.52"
        }];

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.expectGET('/api/things')
        .respond(responseData);

      $rootScope = $injector.get('$rootScope');
      spyOn($rootScope, '$broadcast');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should correctly reset data', function() {

      transferDataSrv.getInitialValues();
      $httpBackend.flush();
      var servers = transferDataSrv.getServersList();
      expect(servers).toEqual([{
        "ip": "10.47.108.594",
        "name": "TEST",
        "currentVersion": "336.25.80.52",
        "_id": 1
      }]);
      expect($rootScope.$broadcast).toHaveBeenCalledWith('transferData: dataRefreshed');

    })

  })




});
