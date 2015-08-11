'use strict';

var module = angular.module('propertyDetailView',['ngRoute','ngFileUpload']);

module.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/property/:property_id', {
		templateUrl: 'propertyDetailView/propertyDetailView.html',
		controller: 'PropertyDetailCtrl'
	});
}]);

module.controller('PropertyDetailCtrl',['$scope','$routeParams','Property', 'Upload',
	function($scope, $routeParams, Property, Upload) {
		var propertyId = $routeParams.property_id;

		Property.getId(propertyId)
			.success(function(data){
				$scope.property = data;
			})
			.error(function(data){
				console.log('Error: '+data);
			});

		$scope.$watch('file', function (file) {
      		$scope.upload($scope.file);
    	});

    	$scope.upload = function(file) {
    		Upload.upload({
    			url: 'api/upload',
    			file: file
    		})
    		.success(function (data) {
    			console.log("File uploaded: "+data);
    		})
    		.error(function(data) {
    			console.log("File upload failed: "+data);
    		});
    	};
	}	
]);

/*
TODO: pretty date format
function formatDate(date) {

}


module.filter('date', function() {
  return formatDate;
});
*/