'use strict';

(function () {

	angular.module('videoServersApp')
	  .factory('transferDataService', ['$http', 'localStorageService', function transferDataFactory($http, localStorage){
	  	return function createTransferDataApi(){

	  		var publicAPI = {},
	  			localStorage = localStorage;

	  		function getServisesList() {
	  			$http.get('/api/things111')
	  				.then(response => {
					        // this.awesomeThings = response.data;
					        console.log("this.things111", this.awesomeThings);
			    		}, error => {
			    			console.log("ERROR", error);
			    		}
			    	);
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