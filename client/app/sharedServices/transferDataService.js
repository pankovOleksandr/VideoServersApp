'use strict';

(function () {

	angular.module('videoServersApp')
	  .factory('transferDataService', ['defaultData', 'localStorageService', function transferDataFactory(defaultData, localStorage){
	  	return function createTransferDataApi(){

	  		var publicAPI = {},
            servers = localStorage.getServers() || defaultData.getServers() || [],
            versions = localStorage.getVersions() || defaultData.getVersions() || [];

	        function init() {
	          if (servers.length == 0 || versions.length == 0) {
	            throw new Error('!!! Empty servers list or version list default values ');
	          }
	        }

	  		function getServersList() {
	  			return servers;
			}

	  		function createItem(newItem) {
	  			servers.unshift(newItem);
	  			console.log("server.unshit ", newItem);
	  		}

	  		function editItem() {

	  		}

	  		function deleteItem() {

	  		}


	  		return publicAPI = {
	  			getServersList : getServersList,
	  			createServerItem : createItem,
	  			editServiceItem : editItem,
	  			deleteServiceItem : deleteItem
	  		}
	  	};
	  }])

  })();
