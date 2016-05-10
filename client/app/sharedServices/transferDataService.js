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
              el._id = createID();
            });

            localStorage.saveToLocalStorage('servers', servers);
            localStorage.saveToLocalStorage('versions', versions);
          }
        }

        function createID() {
          createID.prevID = createID.prevID || servers[servers.length-1]._id || 0;
          return ++createID.prevID;
        }

        function getServersList() {
	  			return localStorage.getFromLocalStorage('servers');
			  }

	  		function createItem(newItem) {
	  			servers.unshift(newItem);
	  		}

	  		function editItem(item) {
          let index = servers.indexOf(item);
          servers[index] = item;
	  		}

	  		function deleteItem(item) {
          let index = servers.indexOf(item);
          servers.splice(index,1);

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
