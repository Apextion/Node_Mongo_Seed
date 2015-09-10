var App = angular.module('CardGen', ['ngRoute']);
            
App.config(['$interpolateProvider', '$routeProvider', function ($interpolateProvider, $routeProvider) {
	$interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
	$routeProvider
        .when('/', {
            templateUrl: './views/dashboard.tpl',
            controller: 'CardGenController'
        })
}]);

App.controller('CardGenController', ['$scope', '$routeParams', function ($scope, $routeParams) {

}]);