/**
 * Created by opankov on 5/10/2016.
 */

describe('versionFilter', function() {

  beforeEach(module('videoServersApp.filters'));

  describe('versionFilter', function() {

    var randomServices = [{
      "ip": "10.47.108.594",
      "name": "ATOMICA",
      "currentVersion": "336.25.80.52"
    },
      {
        "ip": "10.47.108.766",
        "name": "OPTYK",
        "currentVersion": "941.52.80.21"
      },
      {
        "ip": "10.47.108.363",
        "name": "BIFLEX",
        "currentVersion": "139.65.49.05"
      }];

    it('should return only satisfied values',
      inject(function(versionFilterFilter) {
        expect(versionFilterFilter(randomServices, "941.52.80.21" , true)[0].currentVersion).toBe("941.52.80.21");
        expect(versionFilterFilter(randomServices, "941.52.80.21", false).length).toBe(3);
      }));
  });
});
