'use strict';

// TODO: should it be meancrudApp.propertyView?
var app = angular.module('meancrudApp',['ngRoute','propertyView','propertyServices']);

app.config(['$routeProvider',function($routeProvider)  {
  $routeProvider.otherwise({redirectTo: '/property'});
}]);