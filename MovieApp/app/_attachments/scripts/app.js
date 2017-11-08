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

			$scope.movies = '';

			var acteur = $('#acteurText').val();
			var temp = acteur.split(" ");
			var voornaamActeur = temp[0];
			var achternaamActeur = temp[1];
			searchSrv.getMovies(acteur).then(function(data){
	    			searchSrv.getMovies().then(function(data){
	    				acteur = data;
	    				createSrv.setObject('acteur', data);
	    			$scope.movies = searchSrv.getMovies(acteur);
	    			});
			});
		});
	})
	

	.service('searchSrv', function($http, $q){
		this.getMovies = function(acteur) {
			var acteur = $('#acteurText').val();
			var temp = acteur.split(" ");
			var voornaamActeur = temp[0];
			var achternaamActeur = temp[1];
	    			var q = $q.defer();
	    			var url = 'www.theimdbapi.org/api/find/person?name='+ voornaamActeur + "+" + achternaamActeur;

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