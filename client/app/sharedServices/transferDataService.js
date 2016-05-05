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
            throw new Error('!!! Empty servers list or version list default values ')
          }
        }

	  		function getServisesList() {
	  			return servers;
			  }

	  		function createItem() {

	  		}

	  		function editItem() {

	  		}

	  		function deleteItem() {

	  		}


	  		return publicAPI = {
	  			getServisesList : getServisesList,
	  			createServiseItem : createItem,
	  			editServiceItem : editItem,
	  			deleteServiceItem : deleteItem
	  		}
	  	};
	  }])

  })();
