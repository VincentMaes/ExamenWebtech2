'use strict'

angular.module('movieApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'homeCtrl'
	        });
	})
	
.controller('homeCtrl', function($scope, searchSrv){})

.service('searchSrv', function($http, $q){
	this.getMovies = function(movies) {
	    		var q = $q.defer();
	    		var url = 'http://theimdbapi.org/api/find/person?' + encodeURIComponent(movies) + '&format=json';

	    		$http.get(url)
	    			.then(function(data){
	    				q.resolve(data);
	    			}, function error(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
})