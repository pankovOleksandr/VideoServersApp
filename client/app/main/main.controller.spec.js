'use strict';

describe('Component: mainComponent', function() {

  // load the controller's module
  beforeEach(module('videoServersApp'));

  var scope;
  var mainComponent;
  var mockTransferDataFactory = {
      getServersList: function () {
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



  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    $componentController,
    $rootScope) {
      // $httpBackend = _$httpBackend_;
      // $httpBackend.expectGET('/api/things')
      //   .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

      scope = $rootScope.$new();

      mainComponent = $componentController('main', {
        transferDataFactory: mockTransferDataFactory,
        $scope: scope
      });
  }));

  it('should attach a list of things to the controller', function() {
    mainComponent.$onInit();
    // $httpBackend.flush();
    expect(mainComponent.servers.length).toBe(2);
    expect(mainComponent.versions.length).toBe(3);
  });
});
