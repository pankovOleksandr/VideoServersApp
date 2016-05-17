'use strict';

(function () {

	angular.module('videoServersApp')
	  .factory('transferDataFactory', ['defaultData', 'localStorageService', '$http', '$rootScope', function transferDataFactory(defaultData,
                                                                                                                               localStorage,
                                                                                                                               $http,
                                                                                                                               $rootScope){
	  	return function createTransferDataApi(){

	  		var publicAPI = {
            getServersList : getServersList,
            createServerItem : createItem,
            editServiceItem : editItem,
            deleteServiceItem : deleteItem,
            getVersions : getVersions,
            getInitialValues: getInitialValues
          },
            servers = localStorage.getFromLocalStorage('servers') || defaultData.getServers() || [],
            versions = localStorage.getFromLocalStorage('versions') || defaultData.getVersions() || [];

        init();

        return publicAPI;

        function init() {
          if (servers.length == 0 || versions.length == 0) {
            throw new Error('!!! Empty servers list or versions list default values ');
          } else {
            servers.forEach(function(el, i) {
              if (el._id) return;
              createID(el);
            });

            localStorage.saveToLocalStorage('servers', servers);
            localStorage.saveToLocalStorage('versions', versions);
          }
        }

        function findMaxID(arr) {
          var maxID = 0;
          arr.forEach(function(el) {
            if (el.hasOwnProperty('_id')) {
              if (maxID < el._id) {
                maxID = el._id;
              }
            }
          });
          return maxID;
        }

        function createID(item) {
          var lastID = findMaxID(servers);
          item._id = ++lastID;
        }

        function getServersList() {
          var temp = localStorage.getFromLocalStorage('servers');
          if (temp) {
            servers = temp;
          }
	  			return servers;
			  }

	  		function createItem(newItem) {
          createID(newItem);
	  			servers.unshift(newItem);
          localStorage.saveToLocalStorage('servers', servers);
	  		}

	  		function editItem(item) {
          servers.forEach(function(el, i, arr) {
            if (el._id === item._id) {
              arr[i] = item;
            }
          });
          localStorage.saveToLocalStorage('servers', servers);
	  		}

	  		function deleteItem(item) {
          servers = servers.filter(function (el) {
            return (el._id !== item._id);
          });
          localStorage.saveToLocalStorage('servers', servers);
	  		}

        function getVersions() {
          var temp = localStorage.getFromLocalStorage('versions');
          if (temp) {
            versions = temp;
          }
          return versions;
        }

        function getInitialValues() {
          $http.get('/api/things').then(
            function(res) {
              servers = res.data;
              init();
              $rootScope.$broadcast('transferData: dataRefreshed');
            }
          )
        }

	  	};
	  }])

  })();
