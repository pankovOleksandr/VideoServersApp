'use strict';

(function () {

	angular.module('videoServersApp')
	  .factory('transferDataFactory', ['defaultData', 'localStorageService', function transferDataFactory(defaultData, localStorage){
	  	return function createTransferDataApi(){

	  		var publicAPI = {},
            servers = localStorage.getFromLocalStorage('servers') || defaultData.getServers() || [],
            versions = localStorage.getFromLocalStorage('versions') || defaultData.getVersions() || [];

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
	  			return localStorage.getFromLocalStorage('servers');
			  }

	  		function createItem(newItem) {
          createID(newItem);
	  			servers.unshift(newItem);
          console.log(servers);
	  		}

	  		function editItem(item) {
          let index = servers.indexOf(item);
          servers[index] = item;
	  		}

	  		function deleteItem(item) {
          let index = servers.indexOf(item);
          servers.splice(index,1);
          console.log('servers', servers);

	  		}

        function getVersions() {
          return localStorage.getFromLocalStorage('versions');
        }

        init();

	  		return publicAPI = {
	  			getServersList : getServersList,
	  			createServerItem : createItem,
	  			editServiceItem : editItem,
	  			deleteServiceItem : deleteItem,
          getAllVersions : getVersions
	  		}
	  	};
	  }])

  })();
