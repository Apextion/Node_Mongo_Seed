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


App.directive('genForm', function() {

    return {
        restrict: 'E',
        scope: { 
            payload: '=', // '=' Two-way binding
            callback: '&' // '&' Method Binding
        },
        template:   '<div class="form">' +
                        '<div ng-show="payload.processed"><h1> {[{ payload.successMsg }]} </h1></div>' +
                        '<div ng-hide="payload.processed">' +
                            '<h1> {[{ payload.title }]} </h1>' +
                            '<label data-ng-repeat="input in payload.inputs track by $index"><span> {[{ input.dispTitle }]} </span>' +
                                '<input type="text" data-ng-model="input.value" placeholder="{[{ input.placeholder }]}" />' +
                            '</label>' +
                            '<button data-ng-click="callback(payload)"> {[{ payload.actionTitle }]} </button>' +
                        '</div>' +
                    '</div>',
    };
});

App.service('GenFormData', function() {
    var GenForm = function(args) {
        this.title          = args.title         || '';
        this.inputs         = args.aryInputs     || [];
        this.actionTitle    = args.actionTitle   || '';
        this.successMsg     = args.successMsg    || 'Success';
        this.processed      = false;
        this.extractedData;
    };
    GenForm.prototype.addInput = function(input){
        this.inputs.push({
            title: input.title,
            dispTitle: input.dispTitle, 
            placeholder: input.placeholder,
            value: ''
        });
            
    };
    GenForm.prototype.setActionTitle = function(str){
        this.actionTitle = str;
    };
    GenForm.prototype.setTitle = function(str){
        this.title = str;
    };
    GenForm.prototype.extractFormData = function(){
        var objDataCollection = {};
        var aryTargetProps = ['title','value'];

        // Loop all generated inputs
        angular.forEach(this.inputs, function(input, key){
            var objExtration = {};

            // Loop all properties on each input
            for(var prop in input){
                
                // Only target the props in aryTargetProps
                if(aryTargetProps.indexOf(prop) >= 0){

                    // Transpose property and value onto temp obj, building throught the loop
                    objExtration[prop] = input[prop];
                    
                }    
                
            }

            // Once each input has all targeted props fully stripped and transposed pair up the data from the input
            objDataCollection[objExtration.title] = objExtration.value;
        });
        this.extractedData = objDataCollection;
        return this.extractedData;
    };

    return GenForm;
});


App.controller('CardGenController', ['$scope', '$routeParams', 'GenFormData', function ($scope, $routeParams, GenFormData) {
	
	// Generate a form based upon this info
    $scope.cardFormData = new GenFormData({
        title: 'Card Form',
        actionTitle: 'Save',
        parentId: 1,
        successMsg: 'New Rubric Added!',
        aryInputs: [{
                dispTitle: 'Card Title',
                title: 'title',
                value:  '',
            },
            {
                dispTitle: 'Range',
                title: 'range',
                value:  '',
            },
            {
                dispTitle: 'Damage',
                title: 'damage',
                value:  '',
            },
            {
                dispTitle: 'Quantity',
                title: 'quantity',
                value:  '',
            },
            {
                dispTitle: 'Activation',
                title: 'activation',
                value:  '',
            },
            {
                dispTitle: 'Overcharge',
                title: 'overcharge',
                value:  '',
            }]
    });

    $scope.actionAdd = function(){
    	console.log('hit');
    }

	var getData = function(){
		$http.get('data/posts.json').
		success(function(data, status, headers, config) {
		  $scope.posts = data;
		}).
		error(function(data, status, headers, config) {
		  // log error
		});
	}
}]);