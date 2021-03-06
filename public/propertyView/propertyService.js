var module = angular.module('propertyServices',[]);

module.factory('Property', ['$http',function($http) {
	return {
		// call to get all properties.
		get : function() {
			return $http.get('/api/property');
		},

		post : function(formData) {
			return $http.post('/api/property', formData);
		},

		delete : function(id) {
			return $http.delete('/api/property/'+id);
		},

		getId : function(id) {
			return $http.get('/api/property/'+id);
		}
	};
}]);