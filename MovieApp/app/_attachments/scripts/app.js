'use strict'

angular.module('movieApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'homeCtrl'
	        });
	})
	
	.controller('homeCtrl', function($scope, searchSrv, createSrv){
		$('#searchButton').on('click', function (e) {

			$scope.color = '';

			var acteur = $('#acteurText').val();
			searchSrv.getMovies(acteur).then(function(data){
				if(Object.keys(acteur).length == 0){
	    			searchSrv.getMovies().then(function(data){
	    				acteur = data;
	    				createSrv.setObject('acteur', data);
	    			});
	    		}
	    		else {
	    			$scope.color = searchSrv.getMovies(acteur);
	    		}	
			
			});
		});
	})

	.service('searchSrv', function($http, $q){
		this.getMovies = function(acteur) {
	    			var q = $q.defer();
	    			var url = 'www.theimdbapi.org/api/find/person?name={person+name}';

	    			$http.get(url)
	    				.then(function(data){
	    					q.resolve(data);
	    				}, function error(err) {
	    					q.reject(err);
	    				});
	    			
	    				return q.promise;
	    			};
	})
	
	.service('createSrv', function($window, $http){
		  this.setObject = function(key, value){
			  $window.localStorage[key] = JSON.stringify(value);
			  //Save in CouchDB
			  $http.put('../../' + key, value);
		  };
		  
		  this.getObject = function(key){
			  return JSON.parse($window.localStorage[key] || '{}');
		  };
	});