var module = angular.module('propertyView',[]);

module.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/property', {
		templateUrl: 'propertyView/propertyView.html',
		controller: 'PropertyCtrl'
	});
}]);

module.controller('PropertyCtrl',['$scope','Property', function($scope, Property) {
	$scope.test = "This is a test.";

	$scope.sortType = 'sellerLastName';
	$scope.sortReverse = false;

	$scope.addPropertyData = {};

	$scope.addProperty = function() {
		Property.post($scope.addPropertyData)
			.success(function(data) {
				$scope.addPropertyData = {};
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: '+ data);
			});

		$scope.addPropertyData = {};
	};

	// Extract data from promise provided by
	// Property service
	Property.get().success(function(data) {
		$scope.properties = data;
	});
}]);