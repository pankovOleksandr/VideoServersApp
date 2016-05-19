/**
 * Created by opankov on 5/19/2016.
 */

'use strict';

describe('Service: localStorage', function() {
  var localStorageProvider;
  var localStorage;
  var dataToSave;

  beforeEach(module('videoServersApp'));

  beforeEach(function() {
    module(function(localStorageServiceProvider) {
      localStorageProvider = localStorageServiceProvider;
    });
  });

  beforeEach(function() {
    inject(function(_localStorageService_) {
      localStorage = _localStorageService_;
    });

    dataToSave = [{
      "ip": "10.47.108.594",
      "name": "ATOMICA",
      "currentVersion": "336.25.80.52"
    },
      {
        "ip": "10.47.108.766",
        "name": "OPTYK",
        "currentVersion": "941.52.80.21"
     }];
  });

  it('should set and get data', function() {
    localStorage.saveToLocalStorage('servers', dataToSave);
    var result = localStorage.getFromLocalStorage('servers');
    expect(result.length).toBe(2);
  });

  it('should remove data from storage', function() {
    var servers, versions;
    localStorage.saveToLocalStorage('servers', dataToSave);
    localStorage.saveToLocalStorage('versions', dataToSave);

    localStorage.removeFromLocalStorage('servers');
    servers = localStorage.getFromLocalStorage('servers');
    versions = localStorage.getFromLocalStorage('versions');

    expect(servers).toBeNull();
    expect(versions.length).toBe(2);

    localStorage.clearLocalStorage();
    versions = localStorage.getFromLocalStorage('versions');
    expect(versions).toBeNull();
  });

});
