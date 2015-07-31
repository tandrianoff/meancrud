'use strict';

var module = angular.module('propertyDetailView',['ngRoute']);

module.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/property/:property_id', {
		templateUrl: 'propertyDetailView/propertyDetailView.html',
		controller: 'PropertyDetailCtrl'
	});
}]);

module.controller('PropertyDetailCtrl',['$scope','$routeParams','Property',
	function($scope, $routeParams, Property) {
		var propertyId = $routeParams.property_id;
		$scope.test = "This is a test of "+propertyId;

		Property.getId(propertyId)
			.success(function(data){
				$scope.property = data;
			})
			.error(function(data){
				console.log('Error: '+data);
			});
	}	
]);