/**
 * Created by opankov on 4/29/2016.
 */

(function() {

  'use strict';
  
  angular.module('videoServersApp')
    .factory('defaultData', function createDefaultData() {
      var randomVersions = ["111.93.55.31","351.22.82.91","981.55.10.23","121.20.77.99","941.52.23.18","142.52.80.21"];
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
        },
        {
          "ip": "10.47.108.853",
          "name": "EXOSPEED",
          "currentVersion": "735.05.62.19"
        },
        {
          "ip": "10.47.108.25",
          "name": "BLUEGRAIN",
          "currentVersion": "706.89.58.07"
        },
        {
          "ip": "10.47.108.404",
          "name": "UNIA",
          "currentVersion": "36.08.23.19"
        },
        {
          "ip": "10.47.108.96",
          "name": "FLUM",
          "currentVersion": "37.44.16.99"
        },
        {
          "ip": "10.47.108.48",
          "name": "VICON",
          "currentVersion": "975.18.50.46"
        },
        {
          "ip": "10.47.108.541",
          "name": "ENERSAVE",
          "currentVersion": "737.05.23.73"
        },
        {
          "ip": "10.47.108.653",
          "name": "DADABASE",
          "currentVersion": "412.21.13.80"
        },
        {
          "ip": "10.47.108.486",
          "name": "HANDSHAKE",
          "currentVersion": "807.17.97.63"
        },
        {
          "ip": "10.47.108.997",
          "name": "LIQUIDOC",
          "currentVersion": "910.54.0.09"
        },
        {
          "ip": "10.47.108.337",
          "name": "VITRICOMP",
          "currentVersion": "815.85.30.32"
        },
        {
          "ip": "10.47.108.687",
          "name": "OLYMPIX",
          "currentVersion": "378.25.27.41"
        },
        {
          "ip": "10.47.108.347",
          "name": "EPLODE",
          "currentVersion": "449.00.79.34"
        },
        {
          "ip": "10.47.108.111",
          "name": "LYRICHORD",
          "currentVersion": "231.20.17.17"
        },
        {
          "ip": "10.47.108.351",
          "name": "PLUTORQUE",
          "currentVersion": "685.86.14.00"
        },
        {
          "ip": "10.47.108.380",
          "name": "EMERGENT",
          "currentVersion": "256.57.4.51"
        },
        {
          "ip": "10.47.108.291",
          "name": "NORSUP",
          "currentVersion": "183.37.56.14"
        },
        {
          "ip": "10.47.108.611",
          "name": "ONTAGENE",
          "currentVersion": "366.51.79.96"
        },
        {
          "ip": "10.47.108.830",
          "name": "ELITA",
          "currentVersion": "401.43.91.49"
        },
        {
          "ip": "10.47.108.11",
          "name": "PHOLIO",
          "currentVersion": "163.59.0.62"
        },
        {
          "ip": "10.47.108.284",
          "name": "GINKOGENE",
          "currentVersion": "50.17.33.01"
        },
        {
          "ip": "10.47.108.873",
          "name": "INTRAWEAR",
          "currentVersion": "849.37.56.83"
        }];

      function getServers() {
        return randomServices;
      }

      function getVersions() {
        return randomVersions;
      }

      return {
          getServers: getServers,
          getVersions: getVersions
      }
    })


})();

