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
          } else {
            servers.forEach(function(el, i) {
              if (el._id) return;
              el._id = createID();
            })
          }
        }

        function createID() {
          createID.prevID = createID.prevID || servers[servers.length-1]._id || 0;
          return ++createID.prevID;
        }

        function getServersList() {
	  			return servers;
			  }

	  		function createItem(newItem) {
	  			servers.unshift(newItem);
	  		}

	  		function editItem() {

	  		}

	  		function deleteItem(item) {
          let index = servers.indexOf(item);
          servers.splice(index,1);
          console.log(servers);
	  		}

        init();

	  		return publicAPI = {
	  			getServersList : getServersList,
	  			createServerItem : createItem,
	  			editServiceItem : editItem,
	  			deleteServiceItem : deleteItem
	  		}
	  	};
	  }])

  })();
