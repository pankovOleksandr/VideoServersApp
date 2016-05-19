/**
 * Created by opankov on 5/19/2016.
 */
'use strict';

describe('Service: defaultData', function() {
  var defaultDataObj;
  beforeEach(function() {
    module('videoServersApp');
    inject(function(defaultData){
      defaultDataObj = defaultData;
    });
  });

  it('should have a get functions', function() {
    expect(angular.isFunction(defaultDataObj.getServers)).toBe(true);
    expect(angular.isFunction(defaultDataObj.getVersions)).toBe(true);
  });

  it('should return servers list and versions initially', function() {
    var servers = defaultDataObj.getServers();
    var versions = defaultDataObj.getVersions();
    expect(servers.length).toBe(24);
    expect(versions.length).toBe(6);
  });
});
