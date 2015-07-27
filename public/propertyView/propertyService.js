var module = angular.module('propertyServices',[]);

module.factory('Property', ['$http',function($http) {
	return {
		// call to get all properties.
		get : function() {
			return $http.get('/api/property');
		}
	};
}]);