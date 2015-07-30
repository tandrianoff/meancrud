var module = angular.module('propertyView',[]);

module.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/property', {
		templateUrl: 'propertyView/propertyView.html',
		controller: 'PropertyCtrl'
	});
}]);

module.controller('PropertyCtrl',['$scope','Property', function($scope, Property) {
	$scope.test = "This is a test.";

	// Property table sort parameters
	$scope.sortType = 'sellerLastName';
	$scope.sortReverse = false;

	function resetPropertyData() {
		$scope.addPropertyData = {};
		$scope.addPropertyData.available = true;
	}

	resetPropertyData();

	function updateProperties() {
	
		// Extract data from promise provided by
		// Property service
		Property.get().success(function(data) {
			$scope.properties = data;
		});
	}

	$scope.addProperty = function() {
		Property.post($scope.addPropertyData)
			.success(function(data) {
				resetPropertyData();
				updateProperties();
			})
			.error(function(data) {
				console.log('Error: '+ data);
			});

		$scope.addPropertyData = {};
	};

	updateProperties();
}]);