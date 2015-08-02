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

	function updateProperties() {
	
		// Extract data from promise provided by
		// Property service
		Property.get().success(function(data) {
			$scope.properties = data;
		});
	}

	// Page setup
	resetPropertyData();
	updateProperties();

	// functions to use API
	$scope.addProperty = function() {
		Property.post($scope.addPropertyData)
			.success(function(data) {
				console.log(data);
				resetPropertyData();
				updateProperties();
			})
			.error(function(data) {
				console.log('Error: '+ data);
			});

		$scope.addPropertyData = {};
	};

	$scope.removeProperty = function(id) {
		Property.delete(id)
			.success(function(data) {
				console.log(data);
				updateProperties();
			})
			.error(function(data, status) {
				console.log('Error: '+status+' '+ data);
			});
	};
}]);