'use strict';

(function () {

	angular.module('videoServersApp')
	  .factory('transferDataService', ['$http', 'localStorageService', function transferDataFactory($http, localStorage){
	  	return function createTransferDataApi(){

	  		var publicAPI = {};
	  		var servicesList = localStorage.getAllItems() || [] ;
	  		
	  		function getServisesList() {	  			

	  			if (!servicesList.length) {
		  			$http.get('/api/things')
		  				.then(response => {
						        servicesList = response.data;
						        console.log("/api/things - response", servicesList);
						    }, error => {
				    			console.log("ERROR", error);
				    		}
				    	);
				} else {
					return servicesList;
				}
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