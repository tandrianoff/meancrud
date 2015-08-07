var module = angular.module('propertyView',['ui.bootstrap']);

module.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/property', {
		templateUrl: 'propertyView/propertyView.html',
		controller: 'PropertyCtrl'
	});
}]);

module.controller('PropertyCtrl',['$scope','Property', function($scope, Property) {
	$scope.test = "This is a test.";

	$scope.properties = [];

	$scope.filteredProperties = []
	,$scope.currentPage = 1
	,$scope.numPerPage = 10
	,$scope.maxSize = 5;

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

			$scope.$watch("currentPage + numPerPage", function() {
				var begin = (($scope.currentPage - 1)*$scope.numPerPage)
				, end = begin + $scope.numPerPage;

				$scope.filteredProperties = $scope.properties.slice(begin, end);
			});
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